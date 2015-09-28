(function() {

	'use strict';

	var oneWordAtATime = require('./SpeakTextOneWordAtATime.js');
	
	angular.module('app.common.directives', [])

	.directive('oneWordAtATime', ['$interval', oneWordAtATime]);


})();