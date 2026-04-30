const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { z } = require("zod");
require("dotenv").config();

const User = require("../models/User");
const { validateRequest } = require("../middleware/validation");
const { successResponse, errorResponse } = require("../utils/response");
const { addEmailJob } = require("../jobs/worker");

const router = express.Router();

// Validation Schemas
const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  })
});

// Helper for tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET || "fallback_refresh", { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// 🔐 Register
router.post("/register", validateRequest(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return errorResponse(res, "User already exists", 400);

    const salt = await bcrypt.genSalt(12); // Cost factor 12
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Async Email Job
    await addEmailJob({ email: newUser.email, subject: "Welcome to TakeOne", type: "welcome" });

    return successResponse(res, { message: "User registered successfully" }, {}, 201);
  } catch (err) {
    next(err);
  }
});

// 🔓 Login
router.post("/login", validateRequest(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, "Invalid credentials", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, "Invalid credentials", 400);

    const { accessToken, refreshToken } = generateTokens(user);

    // Set HttpOnly cookies
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 15 * 60 * 1000, sameSite: 'strict' });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000, path: '/api/auth/refresh', sameSite: 'strict' });

    return successResponse(res, { user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
});

// 🔄 Refresh Token
router.post("/refresh", async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return errorResponse(res, "No refresh token", 401);

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "fallback_refresh");
    const user = await User.findById(decoded.id);
    if (!user) return errorResponse(res, "User not found", 401);

    const { accessToken } = generateTokens(user);
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 15 * 60 * 1000, sameSite: 'strict' });

    return successResponse(res, { message: "Token refreshed" });
  } catch (err) {
    return errorResponse(res, "Invalid refresh token", 401);
  }
});

// 🔒 Logout
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: '/api/auth/refresh' });
  return successResponse(res, { message: "Logged out successfully" });
});

module.exports = router;
