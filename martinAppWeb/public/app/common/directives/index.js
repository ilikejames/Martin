(function() {

	'use strict';

	var highlightPhrases = require('./HighlightPhrases.js');
	
	angular.module('app.common.directives', [])

	.directive('highlightPhrases', ['$interval', '$sce', highlightPhrases]);


})();