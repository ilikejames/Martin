(function(angular, undefined) {

	'use strict';

	angular.module('ilj.common.services')

	.factory('Speak', function() {
		return function speakText(textToSpeak, lang) {
			lang = lang || 'en';
			return '/audio/translate?lang='+ lang +'&text=' + encodeURIComponent(textToSpeak.trim());
		};
	});

})(angular);
