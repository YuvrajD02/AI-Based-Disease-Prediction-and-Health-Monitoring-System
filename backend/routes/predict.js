import express from "express";
import axios from "axios";

const router = express.Router();

// Test route to verify this code is loaded
router.get("/test", (req, res) => {
  res.json({ message: "Predict route is loaded!", timestamp: new Date().toISOString() });
});

// Connects to Python AI service
router.post("/", async (req, res) => {
  try {
    const { healthData } = req.body;

    if (!healthData || typeof healthData !== 'object') {
      return res.status(400).json({
        message: "Please provide health data as an object",
        example: {
          healthData: {
            "Age": 25,
            "Heart_Rate_bpm": 72,
            "Body_Temperature_C": 37.0,
            "Oxygen_Saturation_": 98,
            "Gender_Male": 1,
            "Systolic": 120,
            "Diastolic": 80,
            "Body ache": 0,
            "Cough": 1,
            "Fatigue": 1,
            "Fever": 1,
            "Headache": 0,
            "Runny nose": 0,
            "Shortness of breath": 0,
            "Sore throat": 1
          }
        }
      });
    }

    console.log("🔍 Received health data:", healthData);
    console.log("📝 Type of healthData:", typeof healthData);
    console.log("📝 Keys in healthData:", Object.keys(healthData));

    const mlApiUrl = process.env.AI_SERVICE_URL || "https://ml-vxmh.onrender.com";
    const predictUrl = mlApiUrl.endsWith('/predict') ? mlApiUrl : `${mlApiUrl}/predict`;

    console.log("📤 Sending to ML API:", predictUrl);

    const payload = { healthData };
    console.log("📦 Payload object:", payload);
    console.log("📦 Stringified Payload:", JSON.stringify(payload));

    // Send healthData directly to the mock model (it expects {healthData: {...}})
    const response = await axios.post(predictUrl, payload, {
      timeout: 15000, // 15 second timeout for cold starts
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("✅ Model prediction successful");

    // Forward the model response
    res.json({
      success: true,
      data: response.data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ AI Prediction Error:", error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        message: "AI model service is not available. Please make sure the model server is running on port 5000.",
        error: "CONNECTION_REFUSED"
      });
    }

    if (error.response) {
      return res.status(error.response.status).json({
        message: "AI model returned an error",
        error: error.response.data
      });
    }

    res.status(500).json({
      message: "AI Prediction Service Error",
      error: error.message
    });
  }
});

// Health check endpoint
router.get("/health", async (req, res) => {
  try {
    const baseUrl = (process.env.AI_SERVICE_URL || "").replace(/\/predict\/?$/, "");
    const healthUrl = `${baseUrl}/health`;

    const response = await axios.get(healthUrl, {
      timeout: 5000
    });

    res.json({
      backend: "healthy",
      model_service: response.data
    });
  } catch (error) {
    res.status(503).json({
      backend: "healthy",
      model_service: "unavailable",
      error: error.message
    });
  }
});

export default router;
