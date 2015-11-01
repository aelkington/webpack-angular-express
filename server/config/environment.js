/**
 * Applys different express.js behavior based on environment.
 * For local development, it'll start the webpack server for hot reloading.
 * For production, it'll serve the 'dist' folder
 */

var config = require('./settings'),
  webpackDevServer = require('../webpackDevServer');

module.exports = function (app, express, webroot) {

  // start development server. This will only start if you are doing local development 'npm run dev'
  if (config.isDeveloping) {
    webpackDevServer(app);
  }else{
    // serve distribution folder
    app.use(express.static(webroot + '/dist'));
  }

};
