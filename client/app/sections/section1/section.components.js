'use strict';

import angular from 'angular';
import Home from './../../components/home/home';
import About from './../../components/about/about';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name
]);

export default componentModule;
