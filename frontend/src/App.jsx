import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import LandingPage from "./pages/LandingPage";
import Doctors from "./pages/Doctors";
import Diagnose from "./pages/Diagnose.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Auth from "./pages/Auth";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />

      </Routes>
      <Footer />
    </>
  );
}
