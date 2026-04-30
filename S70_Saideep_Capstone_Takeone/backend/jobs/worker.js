const { Queue, Worker } = require("bullmq");
const logger = require("../utils/logger");

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
};

// Create Queue
const emailQueue = new Queue("emailQueue", { connection });

// Add Job Helper
const addEmailJob = async (jobData) => {
  await emailQueue.add("sendEmail", jobData, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });
};

// Worker definition
const emailWorker = new Worker("emailQueue", async job => {
  logger.info(`Processing email job ${job.id} for ${job.data.email}`);
  // Simulate email sending logic
  return { status: "sent", to: job.data.email };
}, { connection });

emailWorker.on("completed", job => {
  logger.info(`✅ Job ${job.id} has completed!`);
});

emailWorker.on("failed", (job, err) => {
  logger.error(`❌ Job ${job.id} has failed with ${err.message}`);
});

module.exports = { addEmailJob, emailQueue };
