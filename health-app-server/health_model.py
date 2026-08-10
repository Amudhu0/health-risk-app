import joblib
import numpy as np

diabetes_model = joblib.load('models/diabetes_model.pkl')
heart_disease_model = joblib.load('models/heart_disease_model.pkl')

physical_activity_score = {
    'regularly': 30,
    'occasionally': 5.8,
    'no': 0.5
}

def predict_diabetes(data):
    features = np.array([
        1 if data['bloodPressure'] > 140 else 0,     # High Blood Pressure
        1 if data['cholesterol'] > 200 else 0,       # High Cholesterol
        data['bmi'],                                 # BMI
        1 if data['smokes'] == 'regularly' else 0,   # Smoking Status
        0,                                           # Stroke history
        1 if data['existingHeartDisease'] == 'yes' else 0, # Heart Disease History
        0 if data['performsExercises'] == 'no' else 1,     # Physical activity
        1 if data['drinks'] == 'regularly' else 0,         # Regular drinker
        30,                                                # Max value of mental health value
        physical_activity_score.get(data['performsExercises'], 0),
        0,
        1 if data['gender'] == 'male' else 0,
        data['age'],
        1     # Consumes healthy food
    ])
    features_array = np.array(features).reshape(1, -1)
    prediction = diabetes_model.predict_proba(features_array)
    print('prediction', prediction)
    risk_percentage = prediction[0][1] * 100  # 
    return round(risk_percentage, 2)

def predict_heart_disease(features):
    features_array = np.array(features).reshape(1, -1)
    risk_score = heart_disease_model.predict_proba(features_array)[0][1] * 100
    return round(risk_score, 2)


risk_percentage = predict_diabetes({"age":50,"gender":"female","cholesterol":200,"bloodPressure":90,"glucose":200,"bmi":18,"maxHeartRate":150,"stDepression":1,"smokes":"no","drinks":"regularly","existingHeartDisease":"no","performsExercises":"no","hereditary":"yes"})
print('Diabetes risk Percentage.', risk_percentage)