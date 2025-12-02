import React from "react";

export default function About() {
  return (
    <section className="min-h-screen bg-[#F8FCFD] pb-20 pt-10">

      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-[#133D3E]">
          About HealthCheck AI
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Empowering you with AI-driven health insights
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-16">

        {/* OUR MISSION */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            HealthCheck AI is an innovative AI-driven health assistant that helps users
            identify possible diseases and health conditions from their symptoms
            before consulting a doctor. Our mission is to make preliminary health
            assessment accessible, fast, and reliable for everyone.
          </p>
        </div>

        {/* HOW IT WORKS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>

          <div className="grid md:grid-cols-2 gap-10">

            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="bg-[#DFF6F8] p-4 rounded-xl">
                <span className="text-3xl">🧠</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">AI-Powered Analysis</h3>
                <p className="text-gray-600">
                  Advanced ML algorithms analyze symptom patterns to provide accurate predictions.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="bg-[#DFF6F8] p-4 rounded-xl">
                <span className="text-3xl">🧪</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Medical Database</h3>
                <p className="text-gray-600">
                  Trained using verified medical cases & updated continuously with research.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="bg-[#DFF6F8] p-4 rounded-xl">
                <span className="text-3xl">⚡</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Instant Results</h3>
                <p className="text-gray-600">
                  Get immediate insights and recommendations in seconds.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4">
              <div className="bg-[#DFF6F8] p-4 rounded-xl">
                <span className="text-3xl">🔒</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Privacy First</h3>
                <p className="text-gray-600">
                  All health data is encrypted & never shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TECHNOLOGY STACK */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>

          <p className="text-gray-700 leading-relaxed mb-5">
            HealthCheck AI leverages cutting-edge technology to deliver accurate and reliable health insights:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Machine Learning Models:</strong> Trained on thousands of medical cases.
            </li>
            <li>
              <strong>Natural Language Processing:</strong> Understanding symptom descriptions.
            </li>
            <li>
              <strong>Medical Dataset Integration:</strong> Real-time access to research.
            </li>
            <li>
              <strong>Confidence Scoring:</strong> Transparent prediction accuracy.
            </li>
          </ul>
        </div>

        {/* DISCLAIMER */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-4">Important Disclaimer</h2>

          <p className="text-gray-700 leading-relaxed">
            HealthCheck AI provides preliminary health information and should NOT be used as
            a substitute for medical diagnosis or treatment. Always consult licensed healthcare providers
            with any questions regarding a potential medical condition. Never disregard professional
            advice because of information provided by HealthCheck AI.
          </p>
        </div>

        {/* TEAM SECTION */}
        <div className="bg-gradient-to-r from-[#4FA3A7] to-[#59C3C4] p-10 rounded-3xl text-center text-white shadow-lg">
          <h2 className="text-3xl font-extrabold mb-4">Meet Our Team</h2>

          <p className="max-w-3xl mx-auto leading-relaxed mb-6">
            HealthCheck AI is developed by healthcare professionals, AI researchers,
            and software engineers dedicated to improving healthcare accessibility.
          </p>

          <p className="text-sm opacity-90">
            For partnerships or opportunities, reach out at:  
            <span className="font-semibold"> team@healthcheck.ai</span>
          </p>
        </div>

      </div>

    </section>
  );
}
