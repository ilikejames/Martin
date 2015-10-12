(function() {

	var speakController = require('./SpeakController.js');
	var nameController = require('./NameController.js');

	
	angular.module('app.areas.home', ['app.common.services'])


	.config(['$routeProvider', function($routeProvider) {

		$routeProvider

		.when('/:name', {
			controller : 'SpeakController',
			templateUrl  : 'areas/home/speak.htm'
		})
		.when('/', {
			controller : 'NameController',
			templateUrl : 'areas/home/name.htm'
		});

	}])
	
	.controller('SpeakController', ['$scope', 'TextService', 'SpeechFactory', 'UserService', speakController])

	.controller('NameController', ['$scope', 'SpeechFactory', 'UserService', nameController]);


})();