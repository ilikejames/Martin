
'use strict';

// TODO: move to ui.router

var router = require('../assets/vendor/angular-route/angular-route.js'),
	commonServices = require('./common/services/index.js');


angular.module('app', ['ngRoute', 'app.common.services'])

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

