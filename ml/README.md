# Flash Flood Early ML

**Cascade-aware hazard fusion for combined flash-flood and landslide risk**

Flash Flood Early ML is a hybrid machine-learning pipeline that combines an XGBoost flood model, a Random Forest landslide model, and a learned fusion layer to estimate combined flash-flood / landslide hazard risk. It is designed for integration into **FlashFlood Alert AI**.

---

## Data Validation Note

The current training dataset is a **prototype dataset** used to develop and test the machine-learning pipeline. It should not be presented as a field-validated operational dataset.

Before production deployment in Uttarakhand, the model should be retrained and independently validated using verified local observations, rainfall records, terrain information, landslide inventories, and other relevant hazard data from the target region.

Recommended data sources include:

| Source                      | Data                                                   |
| --------------------------- | ------------------------------------------------------ |
| National Water Data Portal  | Rainfall and hydrological observations                 |
| NRSC / ISRO Landslide Atlas | Landslide inventory and susceptibility information     |
| IMD                         | Weather and rainfall information                       |
| DEM / GIS datasets          | Elevation, slope, drainage and terrain characteristics |
| IoT sensors                 | Local soil, rainfall and ground-condition observations |

All reported validation metrics describe performance on the current development dataset and should not be interpreted as field performance until the system has been retrained and validated using verified target-region observations.

---

## 1. Overview

|                        |                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Problem**            | Early estimation of combined flash-flood and landslide risk at the local level  |
| **Approach**           | Two-branch ML ensemble (flood + landslide) fused by a learned combination layer |
| **Target integration** | FlashFlood Alert AI                                                             |
| **Status**             | Prototype — pending retraining and field validation using verified local data   |

## 2. Algorithm

Flash Flood Early ML is an **ensemble / fusion algorithm**, not a claim of a new fundamental learning paradigm. It consists of three stages:

1. **XGBoost — Flood branch.** Estimates flood-event probability `P_F` from rainfall, soil, and accumulated-rainfall features.
2. **Random Forest — Landslide branch.** Estimates landslide-event probability `P_L` from terrain, slope, soil, and tilt features.
3. **Logistic fusion layer.** Combines `P_F`, `P_L`, and contextual features into a single combined-risk estimate using weights learned from labeled event data rather than manually selected weights.

```text
              INPUT FEATURES
   (Rainfall, Soil, Terrain, IoT, Historical)
                     |
              PREPROCESSING
                     |
            FEATURE ENGINEERING
                     |
       +-------------+-------------+
       |                           |
       v                           v
    XGBOOST                  RANDOM FOREST
  FLOOD MODEL               LANDSLIDE MODEL
       |                           |
       v                           v
   P(FLOOD)                  P(LANDSLIDE)
       |                           |
       +-------------+-------------+
                     |
                     v
             LOGISTIC FUSION LAYER
      (+ rainfall, soil moisture, slope,
       accumulated rainfall, saturation
       proxy, ground tilt)
                     |
                     v
             COMBINED RISK SCORE
```

### Feature Groups

| Group        | Features                                                               |
| ------------ | ---------------------------------------------------------------------- |
| Rainfall     | `rainfall_intensity`, `rainfall_1h/3h/6h/12h/24h`, `forecast_rainfall` |
| Soil         | `soil_moisture`, `soil_saturation_index`                               |
| Terrain      | `slope`, `elevation`, `flow_accumulation`, `drainage_factor`           |
| IoT / Ground | `tilt_x`, `tilt_y`, `sensor_anomaly`                                   |
| Historical   | `historical_event_frequency`, `historical_susceptibility`              |

## 3. Current Dataset

The current dataset contains **1,000 records** with rainfall, soil moisture, terrain, ground-condition, forecast, historical-risk, and derived rainfall-accumulation features.

The dataset is currently used for **model development and pipeline validation**. Before operational deployment, it must be replaced or supplemented with verified observations from the intended deployment region.

## 4. Training

* **Split method:** Chronological 70% training / 30% validation split.
* **Flood branch:** XGBoost trained using rainfall, soil, and accumulation features.
* **Landslide branch:** Random Forest trained using terrain, soil, and ground-tilt features.
* **Fusion layer:** Logistic regression using `[P_F, P_L, rainfall, soil_moisture, slope, accumulated_rainfall, soil_saturation_proxy, ground_tilt]`.

The chronological split is used to reduce the risk of future information being introduced into the training process.

## 5. Validation

Validation is performed on the final 30% of observations in chronological order.

The validation metrics should be treated as **development-stage model metrics**. They must be recalculated after retraining with verified local observations before the system is used for operational early-warning decisions.

## 6. Target Deployment Area

The intended deployment area includes locations in **Rudraprayag and Chamoli districts of Uttarakhand**, subject to availability of sufficient verified local training and validation data.

### Rudraprayag

* Gaurikund
* Rambara
* Kalimath
* Semi
* Chandrapuri
* Agastmuni

### Chamoli

* Tapovan
* Lata
* Pipalkoti
* Nautha

## 7. Repository Structure

```text
flash-flood-early-ml/
├── models/
│   ├── xgboost_flood.pkl
│   ├── random_forest_landslide.pkl
│   ├── flash_flood_early_ml_fusion.pkl
│   └── model_metadata.json
├── reports/
│   └── validation_metrics.csv
├── src/
│   └── predict.py
├── train_pipeline.py
├── requirements.txt
└── README.md
```

## 8. Setup

**Requirements:** Python 3.12+

```bash
pip install -r requirements.txt
python train_pipeline.py
```

## 9. Prediction

```bash
python src/predict.py --input path/to/features.csv
```

`predict.py` expects a dataframe containing the features specified in `models/model_metadata.json`.

Missing or out-of-range values should be checked against the metadata before inference.

## 10. Roadmap to Uttarakhand Deployment

* [ ] Collect verified Uttarakhand rainfall and hydrological observations
* [ ] Integrate verified landslide inventory data
* [ ] Integrate local terrain, drainage and susceptibility information
* [ ] Integrate real-time IoT observations where available
* [ ] Retrain the flood model
* [ ] Retrain the landslide model
* [ ] Retrain the fusion layer
* [ ] Perform chronological and independent validation
* [ ] Calibrate risk thresholds using observed hazard outcomes
* [ ] Conduct field-level validation before operational deployment

## 11. Limitations

* The current model is a development-stage prototype.
* Operational performance depends on the quality and geographic relevance of the training data.
* Fusion weights and alert thresholds require calibration against verified event outcomes.
* Rare hazard events may create class imbalance and should be addressed during retraining.
* Independent validation using unseen local observations is required before operational deployment.
