const jwt = require("jsonwebtoken");

// 🛡 Middleware to protect routes using JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Sets `req.user` to decoded JWT payload
    next(); // Move to route handler
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;