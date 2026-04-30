const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    index: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  deletedAt: {
    type: Date,
    default: null,
    index: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
