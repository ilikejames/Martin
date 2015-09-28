(function() {

	var homeController = require('./HomeController.js');
	var page2Controller = require('./Page2Controller.js');

	
	angular.module('app.areas.home', ['app.common.services'])


	.config(['$routeProvider', function($routeProvider) {

		$routeProvider

		.when('/', {
			controller : 'HomeController',
			templateUrl  : 'areas/home/home.htm'
		})
		.when('/page2', {
			controller : 'Page2Controller',
			templateUrl : 'areas/home/page2.htm'
		})

	}])
	
	.controller('HomeController', ['$scope', 'TextService', 'SpeechFactory', homeController])
	.controller('Page2Controller', ['$scope', 'TextService', 'SpeechFactory', page2Controller]);


})();