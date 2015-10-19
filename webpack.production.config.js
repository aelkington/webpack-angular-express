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
    // build source maps for each bundle
    devtool: 'source-map',

    entry: {
        // application entry path
        app: entryPath,

        // put vendor libraries into their own file
        vendor: ['angular', 'angular-ui-router', 'normalize.css']
    },

    // output each bundle with with their name and a hash for cache busting
    output: {
        path: distPath,
        filename: '[name]-[hash].min.js'
    },

    plugins: [
        // automatically inject dependencies for minification
        new ngAnnotatePlugin({ add: true }),

        // output vendor common chunck
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[hash].min.js'),

        new webpack.optimize.OccurenceOrderPlugin(),

        // load index.html template and inject CSS and JS files
        new HtmlWebpackPlugin({
            template: templatePath,
            inject: 'body',
            filename: 'index.html'
        }),

        // put CSS into it's own file instead of within JS
        new ExtractTextPlugin('[name]-[hash].min.css'),

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
            {test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]'}
        ]
    },

    // parse CSS and add vendor prefixes to CSS rules
    postcss: [
        require('autoprefixer')
    ]
};
