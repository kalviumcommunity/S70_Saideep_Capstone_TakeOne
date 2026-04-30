require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { doubleCsrf } = require("csrf-csrf");
const { v4: uuidv4 } = require("uuid");

const { connectDB } = require("./config/db");
const logger = require("./utils/logger");
const { authLimiter, globalLimiter, errorHandler } = require("./middleware/qualityControl");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

// 1. Trace ID Middleware
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader("X-Request-ID", req.id);
  next();
});

// 2. Security Headers (Helmet)
app.use(helmet());

// 3. CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// 4. Parsers
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || "fallback_cookie_secret"));

// 5. CSRF Protection (using csrf-csrf)
const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || "fallback_csrf_secret",
  cookieName: "x-csrf-token",
  cookieOptions: {
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
});

// CSRF token route
app.get("/api/csrf-token", (req, res) => {
  const token = generateToken(res, req);
  res.json({ csrfToken: token });
});

// Global Rate Limiting
app.use("/api", globalLimiter);

// Auth Limiting
app.use("/api/auth", authLimiter);

// Apply CSRF to state-changing routes
// Temporarily commenting out CSRF application globally so it doesn't break React app without setup
// app.use("/api", doubleCsrfProtection);

// 6. DB Connection
connectDB();

// 7. Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", require("./routes/post"));

// 8. Global Error Handler (Must be last)
app.use(errorHandler);

// 9. Graceful Shutdown
const server = app.listen(process.env.PORT || 5000, () => {
  logger.info(`🚀 Server running on port ${process.env.PORT || 5000}`);
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
});

