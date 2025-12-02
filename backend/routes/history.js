import express from "express";
import Diagnosis from "../models/Diagnosis.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Save diagnosis result
router.post("/", auth, async (req, res) => {
  const { symptoms, predictions } = req.body;

  const record = await Diagnosis.create({
    userId: req.user.id,
    symptoms,
    predictions,
  });

  res.json(record);
});

// Get history for logged-in user
router.get("/", auth, async (req, res) => {
  const history = await Diagnosis.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(history);
});

export default router;
