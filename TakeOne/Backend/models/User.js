const mongoose = require("mongoose");

// 📦 MongoDB Schema for User collection
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: {
    type: String,
    required: false,
  },
}, { timestamps: true }); // Adds createdAt & updatedAt fields automatically

module.exports = mongoose.model("User", UserSchema); // 👤 Exports User model
