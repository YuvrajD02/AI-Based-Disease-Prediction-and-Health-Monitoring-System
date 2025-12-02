import React from "react";

export default function Contact() {
  return (
    <section className="min-h-screen bg-[#F8FCFD] pb-24 pt-10">

      {/* Page Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-[#133D3E]">
          Get in Touch
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Have questions? We'd love to hear from you.
        </p>
      </div>


      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">

        {/* LEFT SIDE — CONTACT CARDS */}
        <div className="space-y-8">

          {/* Address Card */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">📍</span> Address
            </h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              123 Medical Street <br />
              Health City, HC 12345 <br />
              United States
            </p>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">📞</span> Phone
            </h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              +1 (555) 123-4567 <br />
              Mon–Fri: 9AM – 6PM EST
            </p>
          </div>

          {/* Email Card */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">✉️</span> Email
            </h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              contact@healthcheck.ai <br />
              support@healthcheck.ai
            </p>
          </div>
        </div>


        {/* RIGHT SIDE — CONTACT FORM */}
        <div className="bg-white p-10 rounded-2xl border shadow-sm">

          <h3 className="text-2xl font-bold mb-6">
            Send us a Message
          </h3>
          <p className="text-gray-600 mb-8 text-sm">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form className="space-y-6">

            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
                />
              </div>

              <div>
                <label className="font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="font-semibold">Subject</label>
              <input
                type="text"
                placeholder="How can we help you?"
                className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
              />
            </div>

            {/* Message Box */}
            <div>
              <label className="font-semibold">Message</label>
              <textarea
                placeholder="Tell us more about your inquiry..."
                rows="6"
                className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#40A7A9]"
              ></textarea>
            </div>

            <button className="w-full bg-[#40A7A9] text-white py-3 font-semibold rounded-xl hover:bg-[#2b8485] transition">
              Send Message
            </button>
          </form>
        </div>
      </div>


      {/* MAP PLACEHOLDER */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-[#ECF7FA] h-64 md:h-80 rounded-2xl flex justify-center items-center text-gray-500 border">
          Map placeholder - Integration with Google Maps or similar
        </div>
      </div>

    </section>
  );
}
