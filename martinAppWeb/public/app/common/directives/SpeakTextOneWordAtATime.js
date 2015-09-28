(function() {

	'use strict';

	module.exports = function SpeakTextOneWordAtATime($interval) {

		return {

			restrict : 'E',

			templateUrl: 'common/directives/SpeakTextOneWordAtATime.htm',

			scope: {
				text : '@',
				username : '@',
				number : '@'
			},

			link : function($scope, $element, $attributes) {

				console.log('$scope:', $scope);

				var index = 1,
					words = $scope.text.split(' ');



				var timer = $interval(function () {
					index++;
				}, 250);

				console.log('message:', $attributes); 

				$scope.getIndex = function() {
					return index;
				};

				$scope.hasNumber = function() {
					return $scope.number>0;
				};

				$scope.getSpoken = function() {
					var words = $scope.text.split(' ');
					return words.slice(0, index);
				};

				$scope.getUnspoken = function() {
					var words = $scope.text.split(' ');
					return words.slice(index);
				};
			}
		};

	};

})();