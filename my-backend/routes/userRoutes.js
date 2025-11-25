import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* STEP 1 — Save Email */
router.post("/step1", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });

    const newUser = new User({ email });
    await newUser.save();

    res.json({
      message: "Email saved successfully. Proceed to step 2.",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("STEP 1 ERROR:", error);
    res.status(500).json({ error: "Server error during step 1." });
  }
});

/* STEP 2 — Save Word */
router.post("/step2", async (req, res) => {
  try {
    const { userId, word } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required." });
    if (!word) return res.status(400).json({ error: "Word is required." });

    const updatedUser = await User.findByIdAndUpdate(userId, { word }, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found." });

    res.json({
      message: "Word saved successfully. Proceed to step 3.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("STEP 2 ERROR:", error);
    res.status(500).json({ error: "Server error during step 2." });
  }
});

/* STEP 3 — Save Code */
router.post("/step3", async (req, res) => {
  try {
    const { userId, code } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required." });
    if (!code) return res.status(400).json({ error: "Code is required." });

    const updatedUser = await User.findByIdAndUpdate(userId, { code }, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found." });

    res.json({
      message: "Code saved successfully. Registration complete!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("STEP 3 ERROR:", error);
    res.status(500).json({ error: "Server error during step 3." });
  }
});

/* GET All Users */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ error: "Error fetching users." });
  }
});

/* DELETE ALL Users */
router.delete("/all", async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All user data cleared." });
  } catch (error) {
    console.error("DELETE ALL ERROR:", error);
    res.status(500).json({ error: "Error clearing user data." });
  }
});

/* DELETE Single User by ID */
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) return res.status(404).json({ error: "User not found." });

    res.json({ message: "User deleted successfully.", user: deletedUser });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ error: "Error deleting user." });
  }
});

export default router;
