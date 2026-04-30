const Redis = require("ioredis");
const logger = require("../utils/logger");

// Create a robust Redis connection
const redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay; // reconnect after delay
  }
});

redisClient.on("connect", () => logger.info("✅ Redis Connected"));
redisClient.on("error", (err) => logger.error("❌ Redis Error:", err));

// Cache helper
const cacheData = async (key, data, ttl = 900) => { // Default TTL: 15min
  try {
    await redisClient.set(key, JSON.stringify(data), "EX", ttl);
  } catch (err) {
    logger.error("Cache Set Error:", err);
  }
};

const getCachedData = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    logger.error("Cache Get Error:", err);
    return null;
  }
};

const invalidateCache = async (pattern) => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    logger.error("Cache Invalidate Error:", err);
  }
};

module.exports = { redisClient, cacheData, getCachedData, invalidateCache };
