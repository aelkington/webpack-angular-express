var path = require('path'),
  express = require('express'),
  environment = require('./server/config/environment'),
  config = require('./server/config/settings');

const app = express();

// Application middleware and environment configuration
environment(app, express, __dirname);

// start node server and listen for requests
app.listen(config.port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser\n', config.port, config.port);
});
