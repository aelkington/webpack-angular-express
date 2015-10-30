'use strict';

import template from './mainheader.html';
import controller from './mainheader.controller';
import './mainheader.css';

let headerComponent = function () {
  return {
    template,
    controller,
    restrict: 'E',
    controllerAs: 'vm',
    scope: {},
    bindToController: true
  };
};

export default headerComponent;
