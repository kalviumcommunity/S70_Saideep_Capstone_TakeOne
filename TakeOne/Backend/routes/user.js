const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST: Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Create new user
    user = new User({ name, email, password });

    // Save user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Get user details (protected route)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT: Update user details (protected route)
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, bio },
      { new: true, runValidators: true }
    ).select("-password"); // Exclude password

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;