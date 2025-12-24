import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// Call the backend prediction API
export const predictDisease = async (healthData) => {
    try {
        console.log("📤 Sending to backend:", { healthData });
        const response = await axios.post(`${API_URL}/api/predict`,
            { healthData },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("📨 Backend response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Prediction error:", error);
        console.error("Error response:", error.response?.data);
        const errorMessage = error.response?.data?.message || error.message || 'Prediction failed';
        throw new Error(errorMessage);
    }
};

// Check if the AI service is healthy with retry logic for cold starts
export const checkServiceHealth = async (retries = 3, delayMs = 2000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.get(`${API_URL}/api/predict/health`, {
                timeout: 15000 // 15 second timeout for cold starts
            });
            return response.data;
        } catch (error) {
            console.error(`Health check attempt ${attempt}/${retries}:`, error.message);

            // If it's a 503 (service sleeping) and we have retries left, wait and retry
            if (error.response?.status === 503 && attempt < retries) {
                console.log(`Service is waking up... Retrying in ${delayMs}ms`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
                delayMs *= 1.5; // Exponential backoff
                continue;
            }

            // Return appropriate status based on error
            if (error.code === 'ERR_BAD_RESPONSE' && error.response?.status === 503) {
                return { backend: "waking_up", model_service: "unavailable", attempt };
            }
            if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
                return { backend: "timeout", model_service: "unavailable" };
            }
            return { backend: "error", model_service: "unavailable", error: error.message };
        }
    }
    return { backend: "error", model_service: "unavailable", error: "Max retries exceeded" };
};
