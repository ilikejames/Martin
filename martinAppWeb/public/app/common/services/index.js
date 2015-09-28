(function() {

	'use strict';

	var textService = require('./TextService.js'),
		speechFactory = require('./SpeechFactory.js');

	angular.module('app.common.services', [])

		.service('TextService', ['$http', textService])

		.factory('SpeechFactory', ['$window', '$q', '$timeout', speechFactory]);

})();