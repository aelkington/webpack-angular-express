'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var entryPath = path.resolve(__dirname, 'client', 'app', 'app.js');
var templatePath = path.resolve(__dirname, 'client', 'index.tpl.html');
var distPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'eval',
    /*
  entry: {
    hotserver: 'webpack-hot-middleware/client?reload=true',
    app: entryPath,
    vendors: ['angular','angular-ui-router','normalize.css']
  },
  */
    entry: [
        'webpack-hot-middleware/client?reload=true',
        entryPath
    ],
  output: {
    path: distPath,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new ngAnnotatePlugin({
      add: true
    }),
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
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
        {test: /\.html$/,loader: 'html-loader'}
    ]
  }
};
