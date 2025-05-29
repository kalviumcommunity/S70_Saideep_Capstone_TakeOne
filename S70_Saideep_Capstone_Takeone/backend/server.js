require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const aiRoutes = require('./routes/aiRoutes');
const rateLimit = require('./middleware/rateLimiter');
const userRoutes = require('./routes/userRoutes');
const passport = require("passport");
require("./passport"); // 🧠 Passport config file

const authRoutes = require("./routes/auth"); // 🔐 Auth routes
const userRoutes = require("./routes/user"); // 👤 User profile routes

const app = express(); // ✅ Move this up before any app.use()

// 🧠 Middleware
app.use(express.json());
app.use(cors());

// 🛡️ Session middleware (for storing login session data)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// 🚀 Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// 🌐 Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// 🚪 Route middlewares
app.use('/api/users',userRoutes)
app.use('/api/auth',rateLimit);
app.use('/api/ai',aiRoutes);
app.use("/api/auth", authRoutes);   // Register/Login + Google OAuth
app.use("/api/users", userRoutes);  // Profile, Update, Me APIs

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));