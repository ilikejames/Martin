(function(angular, undefined) {
	
	angular.module('ilj.areas.statements')
	
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

			$locationProvider.html5Mode(true);
			
			$routeProvider

			.when('/', {
				templateUrl : 'areas/statements/NewGreetingController.html',
				controller : 'NewGreetingController'
			});

	}]);

})(angular);