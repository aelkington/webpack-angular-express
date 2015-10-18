'use strict';

import template from './about.html';
import controller from './about.controller';
import './about.css';

let aboutComponent = function(){
	return {
		template,
		controller,
		restrict: 'E',
		controllerAs: 'vm',
		scope: {},
		bindToController: true
	};
};


export default aboutComponent;