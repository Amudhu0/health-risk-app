import joblib
import numpy as np

diabetes_model = joblib.load('models/diabetes_model.pkl')
heart_disease_model = joblib.load('models/heart_disease_model.pkl')

def predict_diabetes(data):
    features = np.array([
        1 if data['bloodPressure'] > 140 else 0,   # High Blood Pressure
        1 if data['cholesterol'] > 200 else 0,     # High Cholesterol
        data['bmi'],                               # BMI
        1 if data['smokes'] == 'yes' else 0,       # Smoking Status
        1 if data['heartDisease'] == 'yes' else 0  # Heart Disease History
        
    ])
    features_array = np.array(features).reshape(1, -1)
    risk_score = diabetes_model.predict_proba(features_array)[0][1] * 100
    return round(risk_score, 2)

def predict_heart_disease(features):
    features_array = np.array(features).reshape(1, -1)
    risk_score = heart_disease_model.predict_proba(features_array)[0][1] * 100
    return round(risk_score, 2)