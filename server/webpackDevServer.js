var webpack = require('webpack'),
    webpackMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackConfig = require('../webpack.config.js');

module.exports = function(app){
    const compiler = webpack(webpackConfig);

    app.use(webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
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

    console.info('==> 🔆 Starting Webpack development server');
};