(function() {
	
	'use strict';


	module.exports = function NameController($scope, SpeechFactory, UserService) {
		$scope.user = {
			name : '',
			languages : []
		};

		SpeechFactory.getLanguages().then(function(langs) {
			$scope.user.languages=langs;
		});

		$scope.update = function(user) {
			debugger;
			UserService.create(user)
			.then(function(created) {
				console.log('TODO: change route');
			});
		};
	};

})();