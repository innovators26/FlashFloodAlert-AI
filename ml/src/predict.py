
from pathlib import Path
import json, joblib, numpy as np, pandas as pd
BASE=Path(__file__).resolve().parents[1]
meta=json.loads((BASE/"models/model_metadata.json").read_text())
FEATURES=meta["features"]
FUSION=meta["fusion_features"]

# Final Flash Flood Early ML risk classification thresholds.
# The fusion model produces a probability in [0, 1], which is mapped
# to the four application risk levels used by the platform.
RISK_THRESHOLDS = {
    "LOW": 0.25,
    "MODERATE": 0.50,
    "HIGH": 0.75,
}

def classify_risk(score):
    """Convert Flash Flood Early ML probability into a risk category."""
    score = float(np.clip(score, 0.0, 1.0))
    if score < RISK_THRESHOLDS["LOW"]:
        return "LOW"
    elif score < RISK_THRESHOLDS["MODERATE"]:
        return "MODERATE"
    elif score < RISK_THRESHOLDS["HIGH"]:
        return "HIGH"
    return "CRITICAL"

def predict(df):
    x=df[FEATURES].replace([np.inf,-np.inf],np.nan)
    flood=joblib.load(BASE/"models/xgboost_flood_uttarakhand.pkl")
    land=joblib.load(BASE/"models/random_forest_landslide_uttarakhand.pkl")
    fusion=joblib.load(BASE/"models/flash_flood_early_ml_uttarakhand.pkl")
    pf=flood.predict_proba(x)[:,1]; pl=land.predict_proba(x)[:,1]
    ssi=x["soil_saturation_proxy"].fillna(x["soil_saturation_proxy"].median()).to_numpy()
    m=pd.DataFrame({"flood_probability":pf,"landslide_probability":pl,
                    "cascade_interaction":pf*pl,
                    "flood_soil_interaction":pf*ssi,
                    "landslide_soil_interaction":pl*ssi})
    for c in ["rainfall","soil_moisture","slope","rainfall_24h","rainfall_3d_cum","rainfall_7d_cum","soil_saturation_proxy","ground_tilt"]:
        m[c]=x[c].to_numpy()
    pc=fusion.predict_proba(m[FUSION])[:,1]
    result = pd.DataFrame({"flood_probability":pf,"landslide_probability":pl,"flash_flood_early_ml_probability":pc})
    result["risk_level"] = result["flash_flood_early_ml_probability"].map(classify_risk)
    return result
