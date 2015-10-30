'use strict';

import angular from 'angular';
import Contact from './../../components/contact/contact';

let componentModule = angular.module('app.components', [
  Contact.name
]);


export default componentModule;
