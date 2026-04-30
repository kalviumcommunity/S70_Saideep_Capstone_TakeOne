const express = require("express");
const { z } = require("zod");
const Post = require("../models/post");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validation");
const { successResponse, errorResponse } = require("../utils/response");

const router = express.Router();

const postSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string()
  })
});

// CREATE
router.post("/", authMiddleware, validateRequest(postSchema), async (req, res, next) => {
  try {
    const post = new Post({
      ...req.body,
      creator: req.user.id
    });
    await post.save();
    
    // Populate creator for immediate return
    await post.populate("creator", "name email");

    return successResponse(res, post, {}, 201);
  } catch (err) {
    next(err);
  }
});

// READ (List)
router.get("/", async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = { deletedAt: null };
    
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const posts = await Post.find(query)
      .populate("creator", "name")
      .sort({ createdAt: -1 })
      .limit(50);
      
    return successResponse(res, posts);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", authMiddleware, validateRequest(postSchema), async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, deletedAt: null });
    if (!post) return errorResponse(res, "Post not found", 404);
    
    // Check ownership or admin
    if (post.creator.toString() !== req.user.id && req.user.role !== "admin") {
      return errorResponse(res, "Unauthorized", 403);
    }

    Object.assign(post, req.body);
    await post.save();
    await post.populate("creator", "name");

    return successResponse(res, post);
  } catch (err) {
    next(err);
  }
});

// DELETE (Soft delete)
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, deletedAt: null });
    if (!post) return errorResponse(res, "Post not found", 404);

    if (post.creator.toString() !== req.user.id && req.user.role !== "admin") {
      return errorResponse(res, "Unauthorized", 403);
    }

    post.deletedAt = new Date();
    await post.save();

    return successResponse(res, { message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
