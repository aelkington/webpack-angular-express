'use strict';

import angular from 'angular';
import 'angular-ui-router';
import headerComponent from './mainheader.component';

let headerModule = angular.module('mainHeader', [
  'ui.router'
]).directive('mainHeader', headerComponent);

export default headerModule;
