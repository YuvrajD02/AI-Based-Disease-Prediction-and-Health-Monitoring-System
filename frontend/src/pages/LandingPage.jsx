import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import SymptomChecker from "../components/SymptomChecker";



export default function LandingPage() {
  return (
    <>
      
      <Hero />
      <Features />
      <SymptomChecker />
       <Stats />
     
    </>
  );
}
