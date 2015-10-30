'use strict';

// Use the template and CSS from the first section
import template from './../section1/app.html';
import './../section1/app.css';

let appComponent = ()=> {
  return {
    template,
    restrict: 'E'
  };
};

export default appComponent;
