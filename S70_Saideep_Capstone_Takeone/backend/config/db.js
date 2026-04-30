const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 20, // Add connection pooling limit
      serverSelectionTimeoutMS: 5000,
    });
    logger.info("✅ [BACKEND] MongoDB Connected with Connection Pooling");
  } catch (err) {
    logger.error("❌ [BACKEND] MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Transaction Helper for multi-step DB operations
const withTransaction = async (operations) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await operations(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = { connectDB, withTransaction };
