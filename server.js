var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config.js');

console.log("process.env.NODE_ENV: ",  process.env.NODE_ENV);

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = 3000;
const app = express();



if (isDeveloping) {
  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}else{

    app.use(express.static(__dirname + '/dist'));

    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });

}

app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
