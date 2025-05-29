const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const User = require("../models/User");

const router = express.Router();

// 🔐 Register a new user (Email & Password)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔓 Login existing user (Email & Password)
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
    res.status(500).json({ error: err.message });
  }
});

// 🔗 Google OAuth Start (Redirect user to Google)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// ✅ Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  async (req, res) => {
    try {
      // 🪪 Generate JWT token for Google user
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Redirect with token in query or show success
      res.redirect(`http://localhost:3000?token=${token}`);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// 🔒 Logout (Optional)
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged out from Google");
  });
});

module.exports = router;
