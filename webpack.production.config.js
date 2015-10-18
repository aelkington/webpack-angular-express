'use strict';

var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var entryPath = path.resolve(__dirname, 'client', 'app', 'app.js');
var templatePath = path.resolve(__dirname, 'client', 'index.tpl.html');
var distPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: entryPath,
  output: {
    path: distPath,
    filename: '[name]-[hash].min.js'
  },
  plugins: [

    new ngAnnotatePlugin({
      add: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          mangle: false,
          compress: {warnings: false}
      }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
          {test: /\.html$/,loader: 'ng-cache?prefix=[dir]/[dir]'}
      ]
  },
  postcss: [
    require('autoprefixer')
  ]
};
