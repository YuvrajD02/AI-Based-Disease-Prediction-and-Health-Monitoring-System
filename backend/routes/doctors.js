import express from "express";

const router = express.Router();

// Temporary static doctors list
router.get("/", (req, res) => {
  res.json([
    {
      name: "Dr. Riya Sharma",
      specialist: "General Physician",
      experience: "8+ years",
      contact: "contact@doctor.com",
    },
    {
      name: "Dr. Aman Verma",
      specialist: "Cardiologist",
      experience: "12+ years",
      contact: "care@doctor.com",
    }
  ]);
});

export default router;
