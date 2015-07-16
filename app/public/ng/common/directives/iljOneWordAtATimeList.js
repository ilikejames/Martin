

(function(angular, undefined) {

	'use strict';

	var DEFAULT_SPEED = 250;


	angular.module('ilj.common.directives')

	.directive('iljOneWordAtATimeList', [ '$interval', function($interval) {

		return {

			templateUrl: 'common/directives/iljOneWordAtATimeList.html',

			scope: {
				iljMessages: '&'
			},

			link: function($scope, $element, $attributes) {
				
				var currentIndex = 0,
					counter = 0,
					index = 0,
					messages = [],
					speed = parseInt(($scope.iljSpeed && $scope.iljSpeed()) || DEFAULT_SPEED, 10);

				var timer = $interval(function () {
					if(!isAtEnd()) {
						counter++;
					}
				}, speed );

				$scope.$on('$destroy', function() {
					$interval.cancel(timer);
				});

				$scope.isString = function(itm) {
					return angular.isString(itm);
				}

				$scope.isArray = function(itm) {
					return angular.isArray(itm);
				}

				function isAtEnd() {
					return messages.length == $scope.iljMessages().length &&
						   angular.equals(messages[messages.length-1], $scope.iljMessages()[$scope.iljMessages().length-1]);
				}

				$scope.getItems = function() {

					if(currentIndex==counter || isAtEnd()) {
						return messages;
					}

					var lastDisplayedMessage = messages[messages.length-1],
						rowIndex = Math.max(messages.length-1, 0),
						lastSourceMessage = $scope.iljMessages()[rowIndex];

					if(angular.equals(lastSourceMessage, lastDisplayedMessage)) {
						// handline a new line in the process, append either  the array or start a string
						lastSourceMessage = $scope.iljMessages()[messages.length];
						if(angular.isArray(lastSourceMessage)) {
							messages.push([]);
						}
						else {
							messages.push('');
						}

						if(isAtEnd()) {
							 $scope.$emit('iljOneWordAtATimeList.complete');
						}
						
						return messages;
					}

					if(angular.isString(lastSourceMessage)) {
						// handle string based line
						var sourceWords= lastSourceMessage.split(' '),
							currentWords = lastDisplayedMessage ? lastDisplayedMessage.split(' ') : [];

						currentWords.push(sourceWords[currentWords.length]);
						messages[rowIndex] = currentWords.join(' ');
						currentIndex++;

						if(isAtEnd()) {
							 $scope.$emit('iljOneWordAtATimeList.complete');
						}
						return messages;
					}

					if(angular.isArray(lastSourceMessage)) {

						var subIndex = Math.max(lastDisplayedMessage.length-1, 0);

						if(angular.equals(lastSourceMessage[subIndex], lastDisplayedMessage[subIndex])) {
							messages[messages.length-1].push('');
							currentIndex++;
							return messages;
						}

						var sourceWords= lastSourceMessage[subIndex].split(' '),
							currentWords =  lastDisplayedMessage[subIndex] ? lastDisplayedMessage[subIndex].split(' ') : [];

						currentWords.push(sourceWords[currentWords.length]);
						messages[rowIndex][subIndex] = currentWords.join(' ');
						currentIndex++;

						if(isAtEnd()) {
							 $scope.$emit('iljOneWordAtATimeList.complete');
						}

						return messages;
					}

				}


			}
		}

	}]);

})(angular);



	