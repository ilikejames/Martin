(function() {

	'use strict';

	module.exports = function UserService($http) {

		var user = window.martin.user.name ? window.martin.user : undefined;

		this.get = function() {
			return user;
		};

		this.create = function(user) {
			return $http.post('/api/user', user)
			.then(function(result) {
				user = result.data;
				return user;
			});
		};
		
		this.save = function(user) {
			return $http.patch('/api/user/' + user.uuid, user)
			.then(function(result) {
				user = result.data;
				return user;
			});
		};

	};

})();


