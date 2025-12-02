#!/bin/bash

echo "🚀 Starting HealthCheck AI Model Server..."

# Navigate to the disease model directory
cd "$(dirname "$0")"

# Check if Python is available
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed or not in PATH"
    exit 1
fi

# Check if required packages are installed
echo "📦 Checking dependencies..."
python -c "import flask, numpy, pandas, sklearn" 2>/dev/null || {
    echo "⚠️  Installing required packages..."
    pip install -r requirements.txt
}

# Check if model files exist
if [ ! -f "my_model.pkl" ] || [ ! -f "label_encoder.pkl" ]; then
    echo "❌ Model files not found! Please ensure 'my_model.pkl' and 'label_encoder.pkl' are in this directory."
    exit 1
fi

echo "✅ All dependencies and model files are ready!"
echo "🌐 Starting server on http://localhost:5000"
echo "🔄 Press Ctrl+C to stop the server"

# Start the Flask server
python model_server.py