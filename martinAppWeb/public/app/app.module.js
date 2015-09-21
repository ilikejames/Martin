
var angularRoute = require('../assets/vendor/angular-route/angular-route.js');

var commonServices = require('./common/services/index.js');


'use strict';

var module = angular.module('app', ['ngRoute', 'app.common.services']);



module

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {


	$locationProvider.html5Mode(true);
	
	$routeProvider

	.when('/', {
		controller : 'HelloController',
		templateUrl  : 'example.htm'
	});

}])

.controller('HelloController', [ '$scope', 'TextService', function($scope, textService) {
	textService.getText('james')
	.then(function(res) {
		console.log('textService:', res.data);
	});
}]);

