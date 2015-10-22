'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// define paths
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var entryPath = path.resolve(__dirname, 'client', 'app', 'app.js');
var templatePath = path.resolve(__dirname, 'client', 'index.tpl.html');
var distPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'eval',
  entry: {
    // define webpack hot server to push changes automatically
    hotserver: 'webpack-hot-middleware/client?reload=true',

    // application entry path
    app: entryPath,

    // put vendor libraries into their own file
    vendor: ['angular', 'angular-ui-router', 'normalize.css']
  },

  // output generated bundled files
  output: {
    path: distPath,
    filename: '[name].js',
    publicPath: '/'
  },

  plugins: [
    // automatically inject dependencies for minification
    new ngAnnotatePlugin({add: true}),

    // output vendor common chunck
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

    new webpack.optimize.OccurenceOrderPlugin(),

    // load index.html template and inject CSS and JS files
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: 'body',
      filename: 'index.html'
    }),

    // webpack server for development
    new webpack.HotModuleReplacementPlugin(),

    // skip the emitting phase
    new webpack.NoErrorsPlugin()

  ],

  module: {
    preLoaders: [
      // lint js files
      {test: /\.js$/, exclude: /node_modules/, loader: "jshint-loader"}
    ],
    loaders: [
      // transpile ES6 -> ES5
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel'},

      // loader for JSON files
      {test: /\.json?$/, loader: 'json'},

      // loader for CSS files
      {test: /\.css$/, loader: 'style!css'},

      // loader for HTML files
      {test: /\.html$/, loader: 'html-loader'}
    ]
  }
};
