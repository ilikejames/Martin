(function() {

	'use strict';

	var textService = require('./TextService.js');

	angular.module('app.common.services', [])

		.service('TextService', textService);

})();