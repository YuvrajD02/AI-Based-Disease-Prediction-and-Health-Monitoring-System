import React from "react";
import imgMain from "../assets/image_main.jpg";
import { Link } from "react-router-dom";

export default function Hero() {

  const heroStyle = {
    background: "linear-gradient(180deg, #E7F7F9 0%, #ffffff 100%)",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center"
  };

  return (
    <section style={heroStyle}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-16 py-20 lg:py-32">

        <div className="flex-1">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#167C85] leading-tight">
            Check Your Health Instantly — <br />
            <span className="text-[#0C7B93]">Know What Your Symptoms Mean!</span>
          </h1>

          <p className="mt-5 text-lg text-gray-700 max-w-xl">
            Enter your symptoms and get AI-powered health insights in seconds.
            Make informed decisions about your health with our advanced diagnostic system.
          </p>

          <div className="mt-8 flex gap-5">
            <Link to="/diagnose" className="px-8 py-3 bg-[#0C7B93] text-white font-semibold rounded-xl shadow-md hover:bg-[#095f70] transition">
              Start Diagnosis
            </Link>
            <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src={imgMain}
            alt="Consultation"
            className="w-full max-w-md lg:max-w-xl rounded-3xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}
