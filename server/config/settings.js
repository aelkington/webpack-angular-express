var argv = require('yargs').argv;

var config = {
  isDeveloping: (argv.hasOwnProperty('localDev') && argv.localDev === 'true' && process.env.NODE_ENV !== 'production'),
  port: 3000
};

module.exports = config;
