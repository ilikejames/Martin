(function() {

	'use strict';

	module.exports = function TextService($http) {

		this.getText = function(name) {
			return $http.get('/api/statement/' + name);
		};

	};

})();


