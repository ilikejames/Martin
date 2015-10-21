
(function(angular) {

	'use strict';


	// TODO: move to ui.router
	var router = require('vendor/angular-route/angular-route.js');

	// common
	var commonServices = require('common/services/index.js'),
		commonDirectives = require('common/directives/index.js');

	// areas
	var areaHome = require('areas/home/index.js');


	angular.module('app', ['ngRoute', 'app.common.directives', 'app.areas.home'])

	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}]);


}(angular));


