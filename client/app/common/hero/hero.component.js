'use strict';

import template from './hero.html';
import controller from './hero.controller';
import './hero.css';

let heroComponent = function () {
  return {
    template,
    controller,
    restrict: 'E',
    controllerAs: 'vm',
    scope: {},
    bindToController: true
  };
};

export default heroComponent;
