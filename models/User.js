import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, trim: true, required: true },
  word: { type: String, required: false },
  code: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);