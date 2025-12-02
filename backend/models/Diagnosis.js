import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  symptoms: [String],
  predictions: Array,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Diagnosis", diagnosisSchema);
