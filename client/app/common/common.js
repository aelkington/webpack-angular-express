'use strict';

import angular from 'angular';
import Header from './mainheader/mainheader';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
//import User from './user/user';

let commonModule = angular.module('app.common', [
  Header.name,
  Navbar.name,
  Hero.name
  //User.name
]);

export default commonModule;
