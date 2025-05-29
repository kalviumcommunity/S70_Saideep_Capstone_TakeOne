const cron = require('node-cron');

const cleanupTask = () => {
  console.log("🧹 Cleanup task running at", new Date().toLocaleString());
  // Example logic: Delete inactive users or temp data (mocked here)
};

const startCleanupJob = () => {
  // Runs every minute for demo; in real life, use "0 0 * * *" for daily at midnight
  cron.schedule('* * * * *', cleanupTask);
  console.log("✅ Cleanup job scheduled to run every minute");
};

module.exports = startCleanupJob;