import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  provider: { type: String, default: "local" },
  providerId: String,
  avatar: String
});

const User = mongoose.model("User", userSchema);

export default User;
