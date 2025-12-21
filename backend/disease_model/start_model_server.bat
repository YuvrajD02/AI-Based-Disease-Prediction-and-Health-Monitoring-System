@echo off
setlocal enabledelayedexpansion
echo.
echo 🚀 Starting HealthCheck AI Model Server...
echo.

:: Navigate to the disease model directory
cd /d "%~dp0"
echo Current directory: %cd%

:: Check if Python is available
echo.
echo 📍 Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo.
    echo ❌ Python is not installed or not in PATH
    echo 💡 Please install Python from https://www.python.org/
    echo.
    pause
    exit /b 1
)

:: Check if required packages are installed
echo.
echo 📦 Checking dependencies...
python -c "import flask, numpy, pandas, sklearn" 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Some packages are missing. Installing required packages...
    echo.
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo.
        echo ❌ Failed to install dependencies
        echo.
        pause
        exit /b 1
    )
)

:: Check if model files exist
echo.
echo 🔍 Checkpip install -r backend/disease_model/requirements.txting model files...
if not exist "my_model.pkl" (
    echo ❌ Model file 'my_model.pkl' not found in %cd%
    echo.
    pause
    exit /b 1
)
if not exist "label_encoder.pkl" (
    echo ❌ Label encoder file 'label_encoder.pkl' not found in %cd%
    echo.
    pause
    exit /b 1
)

echo ✅ All dependencies and model files are ready!
echo.
echo 🌐 Starting server on http://localhost:5000
echo 🔄 Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

:: Start the Flask server with unbuffered output
python -u model_server.py

echo.
echo ========================================
echo Server stopped
pause