const mongoose = require("mongoose");

// Implemented DB entity relationships
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
