const expressRateLimit = require("express-rate-limit");
const logger = require("../utils/logger");
const { errorResponse } = require("../utils/response");

// 🛡️ Rate limiting to prevent brute force on Auth routes (5 attempts per 15 min)
const authLimiter = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { success: false, data: null, error: "Too many attempts, please try again after 15 minutes", meta: {} },
  standardHeaders: true,
  legacyHeaders: false,
});

const globalLimiter = expressRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // global rate limit per IP
  standardHeaders: true,
  legacyHeaders: false,
});

// 🧠 Global Error Handler
const errorHandler = (err, req, res, next) => {
  logger.error(`[ERROR] ${req.method} ${req.url} : ${err.message}`, { 
    requestId: req.id, 
    stack: err.stack 
  });
  
  // Don't leak stack traces in production
  const errorMsg = process.env.NODE_ENV === "production" ? "An internal server error occurred" : err.message;
  
  return errorResponse(res, errorMsg, err.status || 500);
};

module.exports = {
  authLimiter,
  globalLimiter,
  errorHandler
};
