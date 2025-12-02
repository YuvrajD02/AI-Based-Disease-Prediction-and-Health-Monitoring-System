import React from "react";

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 text-center">

        <div>
          <h1 className="text-5xl font-bold text-teal-700">10K+</h1>
          <p className="text-gray-600">Diagnoses Made</p>
        </div>

        <div>
          <h1 className="text-5xl font-bold text-teal-700">95%</h1>
          <p className="text-gray-600">Accuracy Rate</p>
        </div>

        <div>
          <h1 className="text-5xl font-bold text-teal-700">500+</h1>
          <p className="text-gray-600">Medical Experts</p>
        </div>
      </div>
    </section>
  );
}
