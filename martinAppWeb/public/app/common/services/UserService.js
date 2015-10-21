(function() {

	'use strict';

	module.exports = function UserService($http) {

		var _user = window.martin.user.name ? window.martin.user : undefined;

		this.get = function() {
			return _user;
		};

		this.create = function(user) {
			return $http.post('/api/user', user)
			.then(function(result) {
				_user = result.data;
				return _user;
			});
		};
		
		this.save = function(user) {
			return $http.patch('/api/user/' + user.uuid, user)
			.then(function(result) {
				_user = result.data;
				return _user;
			});
		};

	};

})();


