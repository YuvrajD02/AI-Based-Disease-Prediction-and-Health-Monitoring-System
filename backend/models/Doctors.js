import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: Number,
  phone: String,
  email: String,
  location: String,
  rating: Number,
  reviews: Number,
  image: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
