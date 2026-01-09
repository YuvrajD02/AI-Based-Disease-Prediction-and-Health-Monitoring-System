import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { login, signup } from "../api/auth.js";
import { GoogleLogin } from "@react-oauth/google";

export default function Auth() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [infoMessage, setInfoMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // ---------------------------------------------
    // Auto-detect login/signup from URL and check for redirect message
    // ---------------------------------------------
    useEffect(() => {
        const mode = searchParams.get("mode");
        setIsLogin(mode !== "signup");

        // Check if there's a message from redirect (like from Diagnose page)
        if (location.state?.message) {
            setInfoMessage(location.state.message);
        }
    }, [searchParams, location]);

    // ---------------------------------------------
    // Handle input changes
    // ---------------------------------------------
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    // ---------------------------------------------
    // Google Login Handler
    // ---------------------------------------------
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const res = await fetch("http://localhost:4000/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    idToken: credentialResponse.credential,
                }),
            });

            const data = await res.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                // Notify navbar and other components of auth change
                window.dispatchEvent(new Event('authChange'));
                // Redirect to the page user came from, or home
                const redirectTo = location.state?.from || "/";
                navigate(redirectTo);
            } else {
                setError(data.message || "Google authentication failed");
            }
        } catch (err) {
            console.error(err);
            setError("Google Login Error — server not responding");
        }
    };

    // ---------------------------------------------
    // Handle form-based login/signup
    // ---------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (!isLogin) {
                // Sign Up
                if (formData.password !== formData.confirmPassword) {
                    setError("Passwords do not match");
                    setLoading(false);
                    return;
                }

                const response = await signup({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                if (response.token) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    // Notify navbar and other components of auth change
                    window.dispatchEvent(new Event('authChange'));
                    // Redirect to the page user came from, or home
                    const redirectTo = location.state?.from || "/";
                    navigate(redirectTo);
                } else {
                    setError(response.message || "Signup failed");
                }
            } else {
                // Login
                const response = await login({
                    email: formData.email,
                    password: formData.password,
                });

                if (response.token) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    // Notify navbar and other components of auth change
                    window.dispatchEvent(new Event('authChange'));
                    // Redirect to the page user came from, or home
                    const redirectTo = location.state?.from || "/";
                    navigate(redirectTo);
                } else {
                    setError(response.message || "Invalid Email or Password");
                }
            }
        } catch (err) {
            setError("Network Error — please try again.");
        }

        setLoading(false);
    };

    // ---------------------------------------------
    // UI STARTS HERE
    // ---------------------------------------------
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E8F7F9] to-white px-4 py-10">

            {/* Logo */}
            <h1 className="text-3xl font-bold text-[#167C85] flex items-center gap-2 mb-8">
                🫀 HealthCheck AI
            </h1>

            {/* Login / Signup Tabs */}
            <div className="bg-white flex w-full max-w-lg rounded-xl overflow-hidden shadow-sm border">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`w-1/2 py-3 font-semibold ${isLogin ? "bg-[#E8F7F9] text-[#167C85]" : "text-gray-600"
                        }`}
                >
                    Login
                </button>

                <button
                    onClick={() => setIsLogin(false)}
                    className={`w-1/2 py-3 font-semibold ${!isLogin ? "bg-[#E8F7F9] text-[#167C85]" : "text-gray-600"
                        }`}
                >
                    Sign Up
                </button>
            </div>

            {/* Card */}
            <div className="bg-white w-full max-w-lg mt-5 p-8 rounded-2xl shadow-lg border">

                {/* Info Message box (for redirects) */}
                {infoMessage && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4">
                        ℹ️ {infoMessage}
                    </div>
                )}

                {/* Error box */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* ==================== LOGIN FORM ==================== */}
                {isLogin ? (
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold">Welcome Back</h2>
                        <p className="text-gray-600 mb-6">Login to continue</p>

                        {/* Email */}
                        <label className="font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            required
                            className="w-full mt-2 mb-4 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
                        />

                        {/* Password */}
                        <label className="font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••"
                            required
                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
                        />

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-[#40A7A9] text-white py-3 rounded-xl font-semibold hover:bg-[#2b8485] transition disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center mt-6 mb-4">
                            <div className="flex-grow border-b"></div>
                            <span className="mx-3 text-gray-500 text-sm">OR</span>
                            <div className="flex-grow border-b"></div>
                        </div>

                        {/* Google Login */}
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => setError("Google Login Failed")}
                            />
                        </div>

                        <p className="text-center text-gray-600 text-xs mt-6">
                            By continuing, you agree to our Terms and Privacy Policy
                        </p>
                    </form>
                ) : (
                    // ==================== SIGNUP FORM ====================
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold">Create Account</h2>
                        <p className="text-gray-600 mb-6">Start your health journey</p>

                        {/* Name */}
                        <label className="font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            required
                            className="w-full mt-2 mb-4 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
                        />

                        {/* Email */}
                        <label className="font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            required
                            className="w-full mt-2 mb-4 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
                        />

                        {/* Password */}
                        <label className="font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••"
                            required
                            className="w-full mt-2 mb-4 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
                        />

                        {/* Confirm Password */}
                        <label className="font-semibold">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="••••••"
                            required
                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
                        />

                        {/* Signup Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-[#40A7A9] text-white py-3 rounded-xl font-semibold hover:bg-[#2b8485] transition disabled:opacity-50"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center mt-6 mb-4">
                            <div className="flex-grow border-b"></div>
                            <span className="mx-3 text-gray-500 text-sm">OR</span>
                            <div className="flex-grow border-b"></div>
                        </div>

                        {/* Google Signup */}
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => setError("Google Signup Failed")}
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
