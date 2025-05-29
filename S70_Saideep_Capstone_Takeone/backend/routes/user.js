const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

dotenv.config();
const router = express.Router();

// 🟢 Register (Duplicate logic — if using auth.js, you can remove this file or merge later)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔵 Login (Again, duplicate with auth.js — keep only one later)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔵 Read: Get Current User Info
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🟡 Write: Update Profile
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, bio },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
