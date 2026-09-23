# 🌧️ FlashFlood Alert AI

### Hyper-Local Multi-Hazard Early Warning & Decision-Support System

> **Turning multi-source environmental data into actionable early warnings for flash floods and landslides in hilly regions.**

---

##  Overview :

**FlashFlood Alert AI** is an AI-powered early warning and decision-support system designed for hilly regions vulnerable to **flash floods and landslides**.

It combines:

- 🌧️ Weather & rainfall data
- 📡 Real-time IoT sensors
- 🛰️ Satellite & DEM data
- 🗺️ GIS & terrain information
- 📚 Historical disaster data
- 🤖 Machine Learning
- 📍 Hyper-local risk mapping
- ⏱️ Lead-time estimation
- 📶 LoRa-based offline alerts
- 🚨 Local sirens/buzzers
- 📱 Web & mobile applications
- 📸 Field verification

The system converts raw environmental data into:

> **RISK → IMPACT → LEAD TIME → ACTION → ALERT**

---

## 🎯 Problem

Hilly regions can experience sudden flash floods and landslides due to:

- Heavy rainfall
- Soil saturation
- Steep slopes
- Drainage conditions
- Terrain characteristics
- Previous rainfall and disaster history

Nearby villages can experience very different risk levels during the same rainfall event.

The key questions are:

```text
WHERE is the danger?
WHEN could it reach the area?
WHY is the risk increasing?
WHAT action should be prepared?
## 💡 Proposed Solution

FlashFlood Alert AI follows:

```text
SENSE → UNDERSTAND → PREDICT → FUSE → MAP
→ ESTIMATE → DECIDE → ALERT → VERIFY → IMPROVE

It converts:

DATA → RISK → IMPACT → LEAD TIME → ACTION → ALERT → FEEDBACK
🚀 Key Features
🌧️ 1. Multi-Source Data Fusion

Combines weather, rainfall, historical events, satellite/DEM, GIS and real-time IoT data for a broader risk assessment.

🤖 2. AI-Based Multi-Hazard Prediction
XGBoost → Flash Flood Risk
Random Forest → Landslide Risk
Logistic Regression → Multi-Hazard Risk Fusion
Multi-Source Data
       ↓
 ┌─────┴─────┐
 ↓           ↓
XGBoost    Random Forest
Flood      Landslide
 ↓           ↓
 └─────┬─────┘
       ↓
Logistic Regression
       ↓
Multi-Hazard Risk
🗺️ 3. GIS & Terrain Intelligence

Uses elevation, slope, flow direction, flow accumulation, drainage, catchments, land cover and village/ward boundaries to create localized risk information.

🌊 4. Catchment-Aware Analysis

Tracks how upstream conditions can influence downstream areas.

UPSTREAM → RAINFALL → FLOW PATH → DOWNSTREAM → IMPACT
⏱️ 5. Lead-Time Estimation

Estimates potential hazard travel time using distance and propagation speed:

T = D / V

The system can provide an estimated time interval when uncertainty is high.

🚨 6. Level-Based Warning
Level	Action
🟢 LOW	Monitor
🟡 MODERATE	Prepare
🟠 HIGH	Prepare / Evacuate as directed
🔴 CRITICAL	Evacuate as directed

Warning decisions consider AI risk, sensor evidence, terrain, environmental conditions, confidence, impact and response window.

📊 7. Risk + Confidence

Risk and confidence are kept separate.

Risk: 90%
Confidence: Moderate
Reason: Upstream sensor unavailable
🔍 8. Explainable AI

Shows the main factors contributing to risk, such as:

Rainfall • Soil Moisture • Slope • Elevation • Flow Accumulation • Historical Events

SHAP can be used for model explanations.

📡 9. Real-Time IoT Monitoring

Prototype uses:

ESP32 • Rain Sensor • Soil Moisture • MPU6050 • BME280/BMP280 • GPS • ESP32-CAM • MicroSD • LoRa

Sensors → ESP32 → MicroSD / LoRa → Gateway → Backend

The prototype rain sensor is used for rain-presence sensing. Calibrated rainfall instruments are required for operational quantitative measurements.

📶 10. Offline-First Alerting

When internet connectivity is unavailable:

IoT Sensor
    ↓
ESP32
    ↓
LoRa
    ↓
Local Receiver
    ↓
Buzzer / Siren

Local data can be buffered and synchronized when connectivity returns.

📱 11. Multi-Channel Alerts

Online: Web Dashboard • Mobile App • SMS • Email • Push Notifications

Offline/Local: LoRa • Buzzer • Siren

📸 12. Field Verification

Field teams can submit GPS locations, photos and event reports.

PREDICTION
    ↓
FIELD OBSERVATION
    ↓
GROUND TRUTH
    ↓
MODEL VALIDATION
    ↓
MODEL IMPROVEMENT

This creates a continuous prediction → verification → learning loop.


This is much better for GitHub because it removes repeated explanations and keeps each feature to **2–4 lines**, while still showing your **AI + GIS + IoT + LoRa + lead-time + warning + field feedback** pipeline.

TeamMember	                 Responsibility
Ahmad Anas P S  - Team Lead, AI/ML & System Architecture
Charumithra C	  - GIS & Geospatial Intelligence
Inbavel R G	  - IoT & Embedded Systems
Abinayaa V	  - Frontend, Mobile & UI/UX
Clement Caleb C - Backend, Database & Cloud
Mohammed Ihsaan - Data, Testing, Validation & Documentation

🌐 Project Links : 
🌍 Website - https://flashflood-alert-ai.vercel.app/

📱 Mobile Application - https://earlydetection-of-flashflood.ai.studio

💻 GitHub - https://github.com/innovators26/FlashFloodAlert-AI

🎥 Demo Video - https://youtu.be/WmXTZ36OBYo

