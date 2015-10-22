var config = {
  isDeveloping: (process.env.LOCAL_DEV === 'true' && process.env.NODE_ENV !== 'production'),
  port: 3000
};

module.exports = config;
