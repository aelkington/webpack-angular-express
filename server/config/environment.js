/**
 * Applys different express.js behavior based on environment.
 * For local development, it'll start the webpack server for hot reloading.
 * For production, it'll serve the 'dist' folder
 */

var config = require('./settings'),
  webpackDevServer = require('../webpackDevServer');

module.exports = function (app, express, webroot) {
  var env = process.env.NODE_ENV || 'development';

  // start development server. This will only start if you are doing local development 'npm run dev'
  if (config.isDeveloping) {
    webpackDevServer(app);
  }

  // serve distribution folder
  if (env === 'production') {
    app.use(express.static(webroot + '/dist'));
  }

};
