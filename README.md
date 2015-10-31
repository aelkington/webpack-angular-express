# webpack-angular-express
A skeleton application written using Angular (1.x), Express, and Webpack.  

This sample application is based on [NG6-starter](https://github.com/AngularClass/NG6-starter/tree/master) and extends it by implementing [Express](http://expressjs.com) as a proxy with [Webpack](https://webpack.github.io).

# Table of Contents
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the Application](#running-the-app)
    * [Testing the Application](#testing)	

# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm`
Once you have these, install the following as globals:  
`npm install -g karma karma-cli webpack`

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install dependencies

## Running the Application
* `npm run dev` to start the app in development mode
* `npm run build` to bundle your code into the `dist` folder
* `npm start` to start Express sever in production mode and serve bundles files in the `dist` folder

## Testing the Application
* `npm run test` will use [Karma](http://karma-runner.github.io) and execute tests found in every `*.spec.js` file.
 
