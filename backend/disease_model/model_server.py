import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model and label encoder
try:
    with open('my_model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    
    with open('label_encoder.pkl', 'rb') as encoder_file:
        label_encoder = pickle.load(encoder_file)
    
    print("✅ Model and encoder loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None
    label_encoder = None

# Define symptoms that the model expects (update based on your training data)
SYMPTOMS_LIST = [
    'fever', 'headache', 'cough', 'fatigue', 'sore_throat',
    'body_aches', 'nausea', 'vomiting', 'diarrhea', 'shortness_of_breath',
    'chest_pain', 'dizziness', 'loss_of_taste_smell', 'rash', 'joint_pain',
    'abdominal_pain', 'back_pain', 'chills', 'sweating', 'weakness'
]

def preprocess_symptoms(symptoms):
    """Convert symptom names to model input format"""
    # Create a binary vector for symptoms
    symptom_vector = [0] * len(SYMPTOMS_LIST)
    
    for symptom in symptoms:
        # Normalize symptom name (lowercase, replace spaces with underscores)
        normalized_symptom = symptom.lower().replace(' ', '_').replace('/', '_')
        
        if normalized_symptom in SYMPTOMS_LIST:
            idx = SYMPTOMS_LIST.index(normalized_symptom)
            symptom_vector[idx] = 1
    
    return np.array(symptom_vector).reshape(1, -1)

@app.route('/predict', methods=['POST'])
def predict_disease():
    try:
        if model is None or label_encoder is None:
            return jsonify({'error': 'Model not loaded properly'}), 500
        
        data = request.json
        symptoms = data.get('symptoms', [])
        
        if not symptoms:
            return jsonify({'error': 'No symptoms provided'}), 400
        
        # Preprocess symptoms
        symptom_vector = preprocess_symptoms(symptoms)
        
        # Make prediction
        prediction = model.predict(symptom_vector)
        prediction_proba = model.predict_proba(symptom_vector)
        
        # Get the predicted disease name
        predicted_disease = label_encoder.inverse_transform(prediction)[0]
        
        # Get confidence score
        confidence = float(np.max(prediction_proba) * 100)
        
        # Get top 3 predictions
        top_3_indices = np.argsort(prediction_proba[0])[-3:][::-1]
        top_3_predictions = []
        
        for idx in top_3_indices:
            disease_name = label_encoder.inverse_transform([idx])[0]
            disease_confidence = float(prediction_proba[0][idx] * 100)
            
            # Add some basic disease info (you can expand this based on your data)
            disease_info = {
                'disease': disease_name,
                'confidence': round(disease_confidence, 1),
                'description': f'Predicted condition: {disease_name}',
                'preventive': [
                    'Consult with a healthcare professional',
                    'Follow prescribed medications if any',
                    'Get adequate rest',
                    'Stay hydrated'
                ]
            }
            top_3_predictions.append(disease_info)
        
        return jsonify({
            'predictions': top_3_predictions,
            'primary_prediction': {
                'disease': predicted_disease,
                'confidence': round(confidence, 1)
            },
            'symptoms_processed': symptoms
        })
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'encoder_loaded': label_encoder is not None
    })

@app.route('/symptoms', methods=['GET'])
def get_available_symptoms():
    """Return list of symptoms the model can process"""
    formatted_symptoms = [symptom.replace('_', ' ').title() for symptom in SYMPTOMS_LIST]
    return jsonify({'symptoms': formatted_symptoms})

if __name__ == '__main__':
    print("🚀 Starting Disease Prediction Model Server...")
    print(f"📊 Model loaded: {model is not None}")
    print(f"🔤 Encoder loaded: {label_encoder is not None}")
    print("🌐 Server will run on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)