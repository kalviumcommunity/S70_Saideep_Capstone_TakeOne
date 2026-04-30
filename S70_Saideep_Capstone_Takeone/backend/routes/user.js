const express = require("express");
const { z } = require("zod");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validation");
const { successResponse, errorResponse } = require("../utils/response");
const { cacheData, getCachedData, invalidateCache } = require("../config/redis");

const router = express.Router();

// Validation Schemas
const updateSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    bio: z.string().optional(),
  })
});

// 🔵 Read: Get Current User Info (with caching)
router.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const cacheKey = `user:${req.user.id}`;
    let user = await getCachedData(cacheKey);

    if (!user) {
      user = await User.findById(req.user.id).select("-password -deletedAt");
      if (!user) return errorResponse(res, "User not found", 404);
      await cacheData(cacheKey, user, 900); // cache for 15m
    }

    return successResponse(res, user);
  } catch (err) {
    next(err);
  }
});

// 🟡 Write: Update Profile
router.put("/update", authMiddleware, validateRequest(updateSchema), async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, bio },
      { new: true, runValidators: true }
    ).select("-password -deletedAt");

    if (!updatedUser) return errorResponse(res, "User not found", 404);

    // Invalidate Cache on write
    await invalidateCache(`user:${userId}`);

    return successResponse(res, { message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
