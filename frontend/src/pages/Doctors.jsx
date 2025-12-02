import React from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "General Physician",
    rating: "4.9",
    reviews: "234",
    experience: "15 years",
    location: "Medical Plaza, Floor 3",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@healthcheck.ai",
    image: "/doctors/doc1.jpg",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    rating: "4.8",
    reviews: "189",
    experience: "12 years",
    location: "Heart Care Center, Floor 2",
    phone: "+1 (555) 234-5678",
    email: "michael.chen@healthcheck.ai",
    image: "/doctors/doc2.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Pediatrician",
    rating: "5.0",
    reviews: "312",
    experience: "10 years",
    location: "Children's Wing, Floor 1",
    phone: "+1 (555) 345-6789",
    email: "emily.rodriguez@healthcheck.ai",
    image: "/doctors/doc3.jpg",
  },
];

export default function Doctors() {
  return (
    <section className="min-h-screen w-full bg-[#F8FCFD] pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Heading */}
        <h1 className="text-4xl font-extrabold text-center text-[#133D3E]">
          Our Medical Experts
        </h1>
        <p className="text-center text-gray-600 mt-3 text-lg">
          Connect with qualified doctors and book appointments for professional medical consultation
        </p>

        {/* Search Bar */}
        <div className="w-full flex justify-center mt-10">
          <div className="flex items-center bg-white shadow-md px-5 py-3 rounded-xl w-full max-w-2xl border">
            <span className="text-gray-500 mr-3 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search by doctor name or specialization..."
              className="w-full outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">

          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl shadow-md border p-6 flex flex-col"
            >
              {/* Doctor Profile */}
              <div className="flex items-center gap-4">
                <img
                  src={doc.image}
                  className="w-20 h-20 rounded-full object-cover"
                  alt={doc.name}
                />
                <div>
                  <h2 className="text-xl font-bold">{doc.name}</h2>
                  <span className="bg-[#D2F5F6] text-[#14888F] px-3 py-1 rounded-full text-sm font-semibold">
                    {doc.role}
                  </span>
                  <p className="mt-1 text-gray-600 text-sm">
                    ⭐ {doc.rating} <span className="text-gray-500">({doc.reviews} reviews)</span>
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 space-y-2 text-gray-700">
                <p>⏳ {doc.experience} experience</p>
                <p>📍 {doc.location}</p>
                <p>📞 {doc.phone}</p>
                <p>📧 {doc.email}</p>
              </div>

              {/* Button */}
              <button className="mt-6 w-full bg-[#1CA5A8] text-white py-3 rounded-xl font-semibold hover:bg-[#17888A] transition">
                Book Appointment
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
