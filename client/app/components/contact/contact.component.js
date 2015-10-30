'use strict';

import controller from './contact.controller';
import template from './contact.html';
import './contact.css';

let contactComponent = function () {
  return {
    template,
    controller,
    restrict: 'E',
    controllerAs: 'vm',
    scope: {},
    bindToController: true
  };
};

export default contactComponent;
