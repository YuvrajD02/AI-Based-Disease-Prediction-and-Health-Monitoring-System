"""
Script to create a proper machine learning model for disease prediction
Run this script to generate fresh model files that work with the current system
"""

import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Sample training data (replace with your actual dataset)
def create_sample_data():
    """Create sample training data for disease prediction"""
    
    # Define symptoms (must match the SYMPTOMS_LIST in model_server.py)
    symptoms = [
        'fever', 'headache', 'cough', 'fatigue', 'sore_throat',
        'body_aches', 'nausea', 'vomiting', 'diarrhea', 'shortness_of_breath',
        'chest_pain', 'dizziness', 'loss_of_taste_smell', 'rash', 'joint_pain',
        'abdominal_pain', 'back_pain', 'chills', 'sweating', 'weakness'
    ]
    
    # Sample disease patterns
    disease_patterns = {
        'Common Cold': [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
        'Influenza': [1,1,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1],
        'Migraine': [0,1,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1],
        'Gastroenteritis': [1,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,1],
        'Hypertension': [0,1,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1],
        'COVID-19': [1,1,1,1,1,0,0,0,1,1,0,0,1,0,0,0,0,1,0,1],
        'Pneumonia': [1,1,1,1,0,1,0,0,0,1,1,0,0,0,0,0,0,1,1,1],
        'Food Poisoning': [1,0,0,1,0,0,1,1,1,0,0,1,0,0,0,1,0,0,1,1]
    }
    
    # Generate training data with variations
    X = []
    y = []
    
    for disease, base_pattern in disease_patterns.items():
        # Generate multiple samples per disease with noise
        for _ in range(100):
            # Add noise to the base pattern
            pattern = base_pattern.copy()
            # Randomly flip some symptoms
            for i in range(len(pattern)):
                if np.random.random() < 0.1:  # 10% chance to flip
                    pattern[i] = 1 - pattern[i]
            
            X.append(pattern)
            y.append(disease)
    
    return np.array(X), np.array(y), symptoms

def train_and_save_model():
    """Train the model and save it to pickle files"""
    
    print("🚀 Creating sample dataset...")
    X, y, symptoms = create_sample_data()
    
    print(f"📊 Dataset: {len(X)} samples, {len(np.unique(y))} diseases")
    print(f"🔤 Diseases: {list(np.unique(y))}")
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Create and train the model
    print("🤖 Training Random Forest model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Create label encoder
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    
    # Retrain with encoded labels
    model.fit(X_train, label_encoder.transform(y_train))
    
    # Test the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(label_encoder.transform(y_test), y_pred)
    print(f"✅ Model Accuracy: {accuracy:.2f}")
    
    # Save the model and encoder
    print("💾 Saving model files...")
    
    with open('my_model.pkl', 'wb') as f:
        pickle.dump(model, f, protocol=pickle.HIGHEST_PROTOCOL)
    
    with open('label_encoder.pkl', 'wb') as f:
        pickle.dump(label_encoder, f, protocol=pickle.HIGHEST_PROTOCOL)
    
    print("✅ Model files saved successfully!")
    print("📁 Files created:")
    print("   - my_model.pkl")
    print("   - label_encoder.pkl")
    
    # Test loading
    print("🧪 Testing model loading...")
    try:
        with open('my_model.pkl', 'rb') as f:
            loaded_model = pickle.load(f)
        with open('label_encoder.pkl', 'rb') as f:
            loaded_encoder = pickle.load(f)
        print("✅ Models load successfully!")
        
        # Test prediction
        sample_symptoms = [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1]  # Common Cold pattern
        prediction = loaded_model.predict([sample_symptoms])
        disease = loaded_encoder.inverse_transform(prediction)[0]
        print(f"🩺 Test prediction: {disease}")
        
    except Exception as e:
        print(f"❌ Error testing model: {e}")

if __name__ == "__main__":
    print("🏥 Disease Prediction Model Creator")
    print("=" * 50)
    
    train_and_save_model()
    
    print("\n🎉 Done! You can now use the original model_server.py")
    print("💡 To use the new model:")
    print("   1. Stop the current mock_model_server.py")
    print("   2. Run: python model_server.py")