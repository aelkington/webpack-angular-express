'use strict';

import angular from 'angular';
import 'angular-ui-router';
import homeComponent from './contact.component';

let homeModule = angular.module('contact', [
  'ui.router'
]).config(($stateProvider, $urlRouterProvider)=> {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('contact', {
      url: '/contact',
      template: '<contact></contact>'
    });
}).directive('contact', homeComponent);

export default homeModule;
