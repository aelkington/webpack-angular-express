'use strict';

import 'jquery';
import angular from 'angular';
import 'angular-ui-router';
import uibs from 'angular-ui-bootstrap';
import Common from './../../common/common';
import Components from './section.components.js';
import AppComponent from './app.component.js';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

let appModule = angular.module('app', [
  'ui.router',
  uibs,
  Common.name,
  Components.name
])
.directive('app', AppComponent);

/*
 * As we are using ES6 with Angular 1.x we can't use ng-app directive
 * to bootstrap the application as modules are loaded asynchronously.
 * Instead, we need to bootstrap the application manually
 */
angular.element(document).ready(()=> {
  angular.bootstrap(document, [appModule.name], {strictDi: false});
});

export default appModule;
