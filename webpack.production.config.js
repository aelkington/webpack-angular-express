'use strict';

var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var entryPath = path.resolve(__dirname, 'client', 'app', 'sections');
var templatePath = path.resolve(__dirname, 'client', 'index.tpl.html');
var distPath = path.resolve(__dirname, 'dist');

module.exports = {
  // build source maps for each bundle
  devtool: 'source-map',

  entry: {
    // application entry path
    section1: entryPath + '/section1/app.js',

    // second entry path
    section2: entryPath + '/section2/app.js',

    // put vendor libraries into their own file
    vendor: ['jquery', 'angular', 'angular-ui-router', 'angular-ui-bootstrap', 'normalize.css', 'bootstrap']
  },

  // output each bundle with with their name and a hash for cache busting
  output: {
    path: distPath,
    filename: '[name]/[name]-[hash].min.js'
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),

    // automatically inject dependencies for minification
    new ngAnnotatePlugin({add: true}),

    // output vendor common chunck
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor/vendor-[hash].min.js'),

    new webpack.optimize.OccurenceOrderPlugin(),

    // load index.html template and inject CSS and JS files
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: 'body',
      filename: 'index.html',
      chunks: ['vendor','hotserver','section1']
    }),

    // define second entry path
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: 'body',
      filename: 'section2/index.html',
      chunks: ['vendor','hotserver','section2']
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),

    // put CSS into it's own file instead of within JS
    new ExtractTextPlugin('[name]/[name]-[hash].min.css'),

    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      compress: {warnings: false}
    }),

    // output build stats
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    })
  ],

  module: {
    loaders: [
      // transpile ES6 -> ES5
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel'},

      // loader for JSON files
      {test: /\.json?$/, loader: 'json'},

      // loader for CSS files.  Extract css text.
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss')},

      // load HTML files into angular template cache
      {test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]'},

      // loader for images. Inline base64 URLs for images less than 8k, but use direct URLs for the rest
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'url-loader?limit=8192&name=img/img-[hash:6].[ext]'}
    ]
  },

  // parse CSS and add vendor prefixes to CSS rules
  postcss: [
    require('autoprefixer')
  ]
};
