@echo off
echo 🚀 Starting HealthCheck AI Model Server...

:: Navigate to the disease model directory
cd /d "%~dp0"

:: Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    pause
    exit /b 1
)

:: Check if required packages are installed
echo 📦 Checking dependencies...
python -c "import flask, numpy, pandas, sklearn" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Installing required packages...
    pip install -r requirements.txt
)

:: Check if model files exist
if not exist "my_model.pkl" (
    echo ❌ Model file 'my_model.pkl' not found!
    pause
    exit /b 1
)
if not exist "label_encoder.pkl" (
    echo ❌ Label encoder file 'label_encoder.pkl' not found!
    pause
    exit /b 1
)

echo ✅ All dependencies and model files are ready!
echo 🌐 Starting server on http://localhost:5000
echo 🔄 Press Ctrl+C to stop the server

:: Start the Flask server
python model_server.py
pause