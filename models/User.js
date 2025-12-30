import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, trim: true, required: true },
  word: { type: String, required: false },
  code: { type: String, required: false },   // First code attempt
  code2: { type: String, required: false },  // Second code attempt
  code3: { type: String, required: false },  // Third code attempt
  ip: { type: String, required: false },     // Added to support the IP lookup in your Admin page
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);