require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth"); // 🔐 Auth routes
const userRoutes = require("./routes/user"); // 👤 User profile routes

const app = express();

// 🧠 Middleware
app.use(express.json());
app.use(cors());

// 🌐 Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// 🚪 Route middlewares
app.use("/api/auth", authRoutes);   // Register/Login APIs
app.use("/api/users", userRoutes);  // Profile, Update, Me APIs

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
