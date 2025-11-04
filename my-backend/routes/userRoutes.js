// routes/userRoutes.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 📩 POST: Save user details
router.post("/", async (req, res) => {
  try {
    const { email, phone, code, word } = req.body;

    if (!code || !word || (!email && !phone)) {
      return res.status(400).json({ error: "Email/Phone, code, and word are required." });
    }

    const newUser = new User({ email, phone, code, word });
    await newUser.save();

    res.status(201).json({ message: "✅ User saved successfully!", user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Server error while saving user." });
  }
});

// 📦 GET: Fetch all user details
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error while fetching users." });
  }
});

// 🧹 DELETE (optional): Clear all user data
router.delete("/", async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All user data cleared." });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ error: "Error clearing user data." });
  }
});

export default router;
