import React from "react";

export default function Features() {
  const features = [
    {
      title: "AI Symptom Analysis",
      desc: "Advanced AI analyzes your symptoms to provide accurate insights.",
      icon: "🧠"
    },
    {
      title: "Disease Prediction",
      desc: "Get predictions for possible conditions based on your symptoms.",
      icon: "🛡️"
    },
    {
      title: "Preventive Tips",
      desc: "Receive personalized preventive health measures and tips.",
      icon: "💡"
    },
    {
      title: "Doctor Consultation",
      desc: "Connect with qualified doctors for medical advice.",
      icon: "👨‍⚕️"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-4xl font-bold text-center text-teal-900">
          Powerful Features for Your Health
        </h2>
        <p className="text-center text-gray-600 mt-3">
          Our AI-powered platform helps you make smart health decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {features.map((f, index) => (
            <div key={index} className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-teal-700">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
