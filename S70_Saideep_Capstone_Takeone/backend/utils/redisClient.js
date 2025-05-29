const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => console.log('❌ Redis Client Error', err));
redisClient.connect(); // required in redis v4+

module.exports = redisClient;