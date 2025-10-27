import joblib
import numpy as np

diabetes_model = joblib.load('models/diabetes_model.pkl')
heart_disease_model = joblib.load('models/heart_disease_model.pkl')

def predict_diabetes(features):
    features_array = np.array(features).reshape(1, -1)
    risk_score = diabetes_model.predict_proba(features_array)[0][1] * 100
    return round(risk_score, 2)

def predict_heart_disease(features):
    features_array = np.array(features).reshape(1, -1)
    risk_score = heart_disease_model.predict_proba(features_array)[0][1] * 100
    return round(risk_score, 2)