import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-teal-700">HealthCheck AI</h2>
          <p className="mt-2 text-gray-600">
            AI-powered health diagnosis to help you understand your symptoms better.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800">Quick Links</h3>
          <ul className="space-y-2 mt-2 text-gray-600">
            <li>Home</li>
            <li>Diagnose</li>
            <li>Doctors</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-800">Company</h3>
          <ul className="space-y-2 mt-2 text-gray-600">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-gray-800">Contact</h3>
          <p className="mt-2 text-gray-600">contact@healthcheck.ai</p>
          <p className="text-gray-600">+1 (555) 123-4567</p>
          <p className="text-gray-600">123 Medical St, Health City</p>
        </div>

        {/*lastt point*/}
        <div className="md:col-span-4 text-center mt-8">
          <p className="mt-6 text-gray-500 text-sm ">
            &copy; 2024 HealthCheck AI. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
