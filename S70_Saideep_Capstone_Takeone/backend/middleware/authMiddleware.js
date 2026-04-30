const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

// 🛡 Middleware to protect routes using JWT from HttpOnly Cookies
const authMiddleware = (req, res, next) => {
  // Try to get token from cookies or Authorization header (fallback for mobile/other clients)
  let token = req.cookies?.accessToken;
  if (!token && req.header("Authorization")) {
    token = req.header("Authorization").split(" ")[1];
  }

  if (!token) return errorResponse(res, "Access denied. No token provided.", 401);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Sets `req.user` to decoded JWT payload
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return errorResponse(res, "Token expired. Please use refresh token.", 401);
    }
    return errorResponse(res, "Invalid token", 401);
  }
};

// RBAC Middleware
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, "Forbidden. Insufficient permissions.", 403);
    }
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };