import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true, // email must always be present
  },
  phone: {
    type: String,
    trim: true,
    required: false, // optional
  },
  code: {
    type: String,
    required: true, // required when submitting full details
  },
  word: {
    type: String,
    required: true, // required when submitting full details
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);

