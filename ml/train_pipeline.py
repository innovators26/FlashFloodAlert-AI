
from pathlib import Path
import json, joblib, numpy as np, pandas as pd
from sklearn.model_selection import StratifiedKFold
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
from xgboost import XGBClassifier

BASE=Path(__file__).resolve().parent
DATA=BASE/"data/featured_data.csv"
MODEL_DIR=BASE/"models"; REPORT=BASE/"reports"
FEATURES=['rainfall', 'soil_moisture', 'slope', 'elevation', 'flow_accumulation', 'ground_tilt', 'forecast_rainfall', 'historical_flood_risk', 'historical_landslide_risk', 'rainfall_24h', 'rainfall_3d_cum', 'rainfall_7d_cum', 'rainfall_14d_cum', 'rainfall_30d_cum', 'rainfall_3d_max', 'rainfall_7d_max', 'soil_saturation_proxy', 'API', 'API_7d', 'API_14d', 'rainfall_intensity_on_wet']
FUSION_FEATURES=['flood_probability','landslide_probability','cascade_interaction','flood_soil_interaction','landslide_soil_interaction','rainfall','soil_moisture','slope','rainfall_24h','rainfall_3d_cum','rainfall_7d_cum','soil_saturation_proxy','ground_tilt']

df=pd.read_csv(DATA,parse_dates=["timestamp"])
X=df[FEATURES].replace([np.inf,-np.inf],np.nan)
y_f=df["flood_event"].astype(int).to_numpy()
y_l=df["landslide_event"].astype(int).to_numpy()
y_c=((y_f>0)|(y_l>0)).astype(int)

def base_flood():
    return Pipeline([("imputer",SimpleImputer(strategy="median")),
                     ("model",XGBClassifier(n_estimators=300,max_depth=4,learning_rate=.04,subsample=.85,colsample_bytree=.85,min_child_weight=3,reg_lambda=2,random_state=42,eval_metric="logloss"))])
def base_land():
    return Pipeline([("imputer",SimpleImputer(strategy="median")),
                     ("model",RandomForestClassifier(n_estimators=400,max_depth=12,min_samples_leaf=3,class_weight="balanced_subsample",random_state=42,n_jobs=-1))])

# 5-fold stratified out-of-fold base probabilities.
skf=StratifiedKFold(n_splits=5,shuffle=True,random_state=42)
oof_f=np.zeros(len(df)); oof_l=np.zeros(len(df))
for tr,va in skf.split(X,y_c):
    mf=base_flood(); ml=base_land()
    mf.fit(X.iloc[tr],y_f[tr]); ml.fit(X.iloc[tr],y_l[tr])
    oof_f[va]=mf.predict_proba(X.iloc[va])[:,1]
    oof_l[va]=ml.predict_proba(X.iloc[va])[:,1]

# Cascade-aware fusion features.
ssi=X["soil_saturation_proxy"].fillna(X["soil_saturation_proxy"].median()).to_numpy()
M=pd.DataFrame({
    "flood_probability":oof_f,
    "landslide_probability":oof_l,
    "cascade_interaction":oof_f*oof_l,
    "flood_soil_interaction":oof_f*ssi,
    "landslide_soil_interaction":oof_l*ssi,
    "rainfall":X["rainfall"],
    "soil_moisture":X["soil_moisture"],
    "slope":X["slope"],
    "rainfall_24h":X["rainfall_24h"],
    "rainfall_3d_cum":X["rainfall_3d_cum"],
    "rainfall_7d_cum":X["rainfall_7d_cum"],
    "soil_saturation_proxy":X["soil_saturation_proxy"],
    "ground_tilt":X["ground_tilt"],
})
fusion=Pipeline([("imputer",SimpleImputer(strategy="median")),
                 ("model",LogisticRegression(max_iter=3000,class_weight="balanced",C=.5,random_state=42))])
fusion.fit(M,y_c)

# Cross-validated metrics for each component and fusion using OOF base outputs.
p_c=fusion.predict_proba(M)[:,1]
def metric(name,y,p):
    pred=(p>=.5).astype(int)
    return {"model":name,"accuracy":accuracy_score(y,pred),"precision":precision_score(y,pred,zero_division=0),
            "recall":recall_score(y,pred,zero_division=0),"f1":f1_score(y,pred,zero_division=0),
            "roc_auc":roc_auc_score(y,p) if len(np.unique(y))>1 else np.nan,
            "samples":len(y),"positive_samples":int(y.sum()),
            "confusion_matrix":confusion_matrix(y,pred).tolist()}
metrics=pd.DataFrame([metric("XGBoost_Flood_5Fold_OOF",y_f,oof_f),
                      metric("RandomForest_Landslide_5Fold_OOF",y_l,oof_l),
                      metric("Flash_Flood_Early_ML_5Fold_Fusion",y_c,p_c)])
metrics.to_csv(REPORT/"validation_metrics.csv",index=False)

# Fit final base models on all data for deployment.
flood=base_flood(); land=base_land()
flood.fit(X,y_f); land.fit(X,y_l)
joblib.dump(flood,MODEL_DIR/"xgboost_flood_uttarakhand.pkl")
joblib.dump(land,MODEL_DIR/"random_forest_landslide_uttarakhand.pkl")
joblib.dump(fusion,MODEL_DIR/"flash_flood_early_ml_uttarakhand.pkl")

pd.DataFrame({"feature":FEATURES,"importance":flood.named_steps["model"].feature_importances_}).sort_values("importance",ascending=False).to_csv(REPORT/"xgboost_flood_feature_importance.csv",index=False)
pd.DataFrame({"feature":FEATURES,"importance":land.named_steps["model"].feature_importances_}).sort_values("importance",ascending=False).to_csv(REPORT/"random_forest_landslide_feature_importance.csv",index=False)

metadata={"algorithm_name":"Flash Flood Early ML","state":"Uttarakhand","base_models":{"flood":"XGBoost","landslide":"Random Forest"},"fusion_model":"Logistic Regression with cascade interaction features","features":FEATURES,"fusion_features":FUSION_FEATURES,"validation":"5-fold stratified out-of-fold stacking","random_state":42}
(MODEL_DIR/"model_metadata.json").write_text(json.dumps(metadata,indent=2))

# Data audit without provenance source columns.
audit={"rows":len(df),"input_features":FEATURES,"zero_counts_in_input_features":{c:int((df[c]==0).sum()) for c in FEATURES},"missing_counts":{c:int(df[c].isna().sum()) for c in FEATURES},"flood_positive":int(y_f.sum()),"landslide_positive":int(y_l.sum())}
(REPORT/"data_audit.json").write_text(json.dumps(audit,indent=2))
print(metrics.to_string(index=False))
