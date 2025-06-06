const mongoose = require("mongoose");

// Implemented DB entity relationships
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);