const User = require('../models/User');
const redisClient = require('../utils/redisClient');

const getAllUsers = (req, res) => {
  redisClient.get('all_users').then(cachedUsers => {
    if (cachedUsers) {
      return res.json({ source: 'cache', users: JSON.parse(cachedUsers) });
    } else {
      User.find()
        .then(users => {
          redisClient.setEx('all_users', 60, JSON.stringify(users)); // cache for 60s
          res.json({ source: 'database', users });
        })
        .catch(err => res.status(500).json({ error: 'DB error' }));
    }
  });
};

module.exports = { getAllUsers };