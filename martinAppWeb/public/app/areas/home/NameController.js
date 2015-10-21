(function() {
	
	'use strict';

	module.exports = function NameController($scope, SpeechFactory, UserService, $location) {

		$scope.user = {
			name : '',
			languages : []
		};

		SpeechFactory.getLanguages().then(function(langs) {
			$scope.user.languages=langs;
		});

		$scope.update = function(user) {
			UserService.create(user)
			.then(angular.bind(this, $location.path, '/' + user.name));
			// function(created) {
				//$location.path('/' + user.name);
			//});
		};
		
	};

})();