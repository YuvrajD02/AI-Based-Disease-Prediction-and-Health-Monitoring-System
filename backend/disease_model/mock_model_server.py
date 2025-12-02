import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Mock disease database for temporary use
DISEASE_DATABASE = {
    'common_cold': {
        'name': 'Common Cold',
        'description': 'A viral infection of your nose and throat (upper respiratory tract).',
        'preventive': ['Rest well', 'Stay hydrated', 'Use over-the-counter medications', 'Wash hands frequently']
    },
    'flu': {
        'name': 'Influenza (Flu)',
        'description': 'A viral infection that attacks your respiratory system.',
        'preventive': ['Get annual flu vaccine', 'Rest and hydrate', 'Antiviral medications if prescribed']
    },
    'migraine': {
        'name': 'Migraine',
        'description': 'A headache disorder characterized by recurrent headaches.',
        'preventive': ['Identify triggers', 'Regular sleep schedule', 'Stress management', 'Stay hydrated']
    },
    'gastroenteritis': {
        'name': 'Gastroenteritis',
        'description': 'Inflammation of the stomach and intestines.',
        'preventive': ['Stay hydrated', 'Eat bland foods', 'Wash hands thoroughly', 'Avoid contaminated food']
    },
    'hypertension': {
        'name': 'Hypertension',
        'description': 'High blood pressure that can lead to serious health complications.',
        'preventive': ['Regular exercise', 'Healthy diet', 'Limit sodium intake', 'Manage stress']
    }
}

# Symptom to disease mapping (mock ML logic)
SYMPTOM_DISEASE_MAP = {
    'fever': ['common_cold', 'flu', 'gastroenteritis'],
    'headache': ['common_cold', 'migraine', 'flu'],
    'cough': ['common_cold', 'flu'],
    'fatigue': ['common_cold', 'flu', 'hypertension'],
    'sore_throat': ['common_cold'],
    'body_aches': ['flu'],
    'nausea': ['migraine', 'gastroenteritis'],
    'vomiting': ['gastroenteritis'],
    'diarrhea': ['gastroenteritis'],
    'shortness_of_breath': ['flu'],
    'chest_pain': ['hypertension'],
    'dizziness': ['migraine', 'hypertension'],
    'abdominal_pain': ['gastroenteritis'],
    'chills': ['flu'],
    'weakness': ['flu', 'hypertension']
}

def normalize_symptom(symptom):
    """Normalize symptom name to lowercase with underscores"""
    return symptom.lower().replace(' ', '_').replace('/', '_')

def mock_predict_from_health_data(health_data):
    """Mock ML prediction using health data and symptoms"""
    
    # Extract vital signs
    age = health_data.get('Age', 0)
    heart_rate = health_data.get('Heart_Rate_bpm', 70)
    temp = health_data.get('Body_Temperature_C', 37.0)
    oxygen = health_data.get('Oxygen_Saturation_', 98)
    gender = health_data.get('Gender_Male', 0)
    systolic = health_data.get('Systolic', 120)
    diastolic = health_data.get('Diastolic', 80)
    
    # Extract symptoms
    symptoms = {
        'body_ache': health_data.get('Body ache', 0),
        'cough': health_data.get('Cough', 0),
        'fatigue': health_data.get('Fatigue', 0),
        'fever': health_data.get('Fever', 0),
        'headache': health_data.get('Headache', 0),
        'runny_nose': health_data.get('Runny nose', 0),
        'shortness_of_breath': health_data.get('Shortness of breath', 0),
        'sore_throat': health_data.get('Sore throat', 0)
    }
    
    disease_scores = {}
    
    # Analyze vital signs for disease indicators
    if temp > 38.0 or symptoms['fever']:  # High temperature
        disease_scores['flu'] = disease_scores.get('flu', 0) + 2
        disease_scores['common_cold'] = disease_scores.get('common_cold', 0) + 1
    
    if heart_rate > 100:  # Tachycardia
        disease_scores['flu'] = disease_scores.get('flu', 0) + 1
        disease_scores['hypertension'] = disease_scores.get('hypertension', 0) + 1
    
    if oxygen < 95 or symptoms['shortness_of_breath']:  # Low oxygen
        disease_scores['flu'] = disease_scores.get('flu', 0) + 2
    
    if systolic > 140 or diastolic > 90:  # High blood pressure
        disease_scores['hypertension'] = disease_scores.get('hypertension', 0) + 3
    
    # Analyze symptom patterns
    respiratory_symptoms = symptoms['cough'] + symptoms['sore_throat'] + symptoms['runny_nose']
    if respiratory_symptoms >= 2:
        disease_scores['common_cold'] = disease_scores.get('common_cold', 0) + 2
        disease_scores['flu'] = disease_scores.get('flu', 0) + 1
    
    if symptoms['headache'] and symptoms['fatigue']:
        disease_scores['migraine'] = disease_scores.get('migraine', 0) + 2
        disease_scores['flu'] = disease_scores.get('flu', 0) + 1
    
    gastrointestinal_symptoms = symptoms['body_ache'] + symptoms['fatigue']
    if gastrointestinal_symptoms >= 1 and temp > 37.5:
        disease_scores['gastroenteritis'] = disease_scores.get('gastroenteritis', 0) + 2
    
    # Convert to predictions with confidence scores
    predictions = []
    
    if disease_scores:
        # Sort diseases by score
        sorted_diseases = sorted(disease_scores.items(), key=lambda x: x[1], reverse=True)
        
        # Take top 3 predictions
        for disease_key, score in sorted_diseases[:3]:
            if disease_key in DISEASE_DATABASE:
                # Calculate confidence based on score and vital signs
                base_confidence = min(90, score * 20 + 30)
                
                # Adjust confidence based on vital sign severity
                if disease_key == 'hypertension' and (systolic > 140 or diastolic > 90):
                    base_confidence += 10
                elif disease_key == 'flu' and (temp > 38.5 or oxygen < 95):
                    base_confidence += 15
                
                confidence = min(95, base_confidence + np.random.randint(0, 10))
                
                prediction = {
                    'disease': DISEASE_DATABASE[disease_key]['name'],
                    'confidence': round(confidence, 1),
                    'description': DISEASE_DATABASE[disease_key]['description'],
                    'preventive': DISEASE_DATABASE[disease_key]['preventive']
                }
                predictions.append(prediction)
    
    # If no strong matches, provide general assessment
    if not predictions:
        if temp > 37.5 or any(symptoms.values()):
            predictions.append({
                'disease': 'Mild Health Concern',
                'confidence': 60.0,
                'description': 'Your symptoms suggest a minor health issue that may resolve with self-care.',
                'preventive': [
                    'Monitor your symptoms',
                    'Get adequate rest',
                    'Stay well hydrated',
                    'Consult healthcare provider if symptoms worsen'
                ]
            })
        else:
            predictions.append({
                'disease': 'Normal Health Status',
                'confidence': 85.0,
                'description': 'Your vital signs and symptom profile appear normal.',
                'preventive': [
                    'Continue healthy lifestyle habits',
                    'Regular check-ups recommended',
                    'Stay active and eat well',
                    'Monitor any new symptoms'
                ]
            })
    
    return predictions

@app.route('/predict', methods=['POST'])
def predict_disease():
    try:
        data = request.json
        if not data or 'healthData' not in data:
            return jsonify({'error': 'No health data provided'}), 400
        
        health_data = data['healthData']
        if not isinstance(health_data, dict):
            return jsonify({'error': 'Health data must be an object'}), 400
        
        print(f"🔍 Processing health data: {health_data}")
        
        # Generate mock predictions based on health data
        predictions = mock_predict_from_health_data(health_data)
        
        response = {
            'predictions': predictions,
            'primary_prediction': predictions[0] if predictions else None,
            'health_data_processed': health_data,
            'note': 'Using mock AI model - replace with trained model for production'
        }
        
        print(f"✅ Generated {len(predictions)} predictions")
        return jsonify(response)
        
    except Exception as e:
        print(f"❌ Prediction error: {e}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': True,  # Mock as loaded
        'encoder_loaded': True,  # Mock as loaded
        'note': 'Using mock AI service'
    })

@app.route('/symptoms', methods=['GET'])
def get_available_symptoms():
    """Return list of symptoms the model can process"""
    symptoms = [
        'Fever', 'Headache', 'Cough', 'Fatigue', 'Sore Throat',
        'Body Aches', 'Nausea', 'Vomiting', 'Diarrhea', 'Shortness of Breath',
        'Chest Pain', 'Dizziness', 'Abdominal Pain', 'Chills', 'Weakness'
    ]
    return jsonify({'symptoms': symptoms})

if __name__ == '__main__':
    print("🚀 Starting Mock Disease Prediction Model Server...")
    print("📊 Mock Model: Active")
    print("🔤 Mock Encoder: Active") 
    print("🌐 Server will run on http://localhost:5000")
    print("⚠️  Note: This is a mock service - replace with trained model for production")
    
    app.run(host='0.0.0.0', port=5000, debug=True)