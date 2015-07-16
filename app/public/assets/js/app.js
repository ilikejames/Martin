(function(angular, undefined) {
	'use strict';
	var module = angular.module('ilj', ['ilj.areas.statements']);
})(angular);



(function(angular, undefined) {
	
	angular

	.module(

		'ilj.areas.statements', 
		[
			'ngRoute', 
			'ilj.common.services', 
			'ilj.common.directives'
		]

	);


})(angular);

(function(angular, undefined) {

	'use strict';
	
	angular.module('ilj.areas.statements')
		
	.controller('NewGreetingController', ['TextService', 'Speak', '$scope', function(textService, speakFactory, $scope) {
		
		var messages = [
			textService.getNumberOfSentances(1,8),
			[]
		];

		$scope.language = 'da'
		$scope.items = messages;
		$scope.soundUrl = speakFactory(messages[0], $scope.language);

		var textFinished = false, 
			soundFinished = false;

		function doNext() {
			var a = textService.getNumberOfSentances(1 + Math.floor(Math.random()*3), 10);
			$scope.items[1].push(a);
			$scope.soundUrl = speakFactory($scope.items[1].length + '. ' + a, $scope.language);
			textFinished = soundFinished = false;
		}

		$scope.$on('iljOneWordAtATimeList.complete', function() {
			textFinished = true;
			soundFinished && doNext();
		});

		$scope.$on('iljAudioPlayer.ended', function() {
			soundFinished = true;
			textFinished && doNext();
		});

	}])


})(angular);

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
(function(angular, undefined) {
	
	angular.module('ilj.common.directives', ['ilj.common.filters']);

})(angular);

(function(angular, undefined) {
	
	angular.module('ilj.common.directives')

	.directive('iljAudioPlayer', [function() {

		return {
	        link: function($scope, $element) {   
	            $element.bind('ended', function(e) {
	            	$scope.$emit('iljAudioPlayer.ended');
	            });
	        }
	    }

	}]);

})(angular);


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



	
(function(angular, undefined) {
	
	angular.module('ilj.common.filters', []);

})(angular);

(function(angular, undefined) {
	
	var module = angular.module('ilj.common.filters');

	module.filter('trusted', ['$sce', function ($sce) {
		return function(url) {
		    return $sce.trustAsResourceUrl(url);
		};
	}]);


})(angular);
(function(angular, undefined) {
	
	angular.module('ilj.common.services', []);

})(angular);
(function(angular, undefined) {

	'use strict';

	angular.module('ilj.common.services')

	.factory('Speak', function() {
		return function speakText(textToSpeak, lang) {
			lang = lang || 'en';
			return '/audio/translate?lang='+ lang +'&text=' + encodeURIComponent(textToSpeak.trim());
		};
	});

})(angular);


(function(angular, undefined) {

	'use strict';

	angular.module('ilj.common.services')

	.service('TextService', function() {

		this.getWord = function() {
			// really silly method to generate a word

			var vowels="aeiou",
				consonents = "qwrtypsdfghjklzxcvbnm",
				selection = [
					vowels, consonents
				]

			var length = Math.floor(Math.random()*10)+1,
				using = length==1 ? 0 : Math.round(Math.random());

			var word = '';

			while(word.length<length) {
				var tmp = using == 0 ? vowels : consonents;
				using = using ^ 1; // flip the bit
				word+= tmp.substr(Math.floor(Math.random()*tmp.length),1);
			}

			return word;
		}

		this.getSentance = function(maxSize) {
			var words = _.times(Math.floor(Math.random()*maxSize)+1, this.getWord);
			// insert Martin somewhere
			words.push('Martin');
			words = _.shuffle(words);
			words[0] = words[0].substr(0,1).toUpperCase() + words[0].substr(1);
			return words.join(' ')+'. ';
		},

		this.getNumberOfSentances = function(number, maxSize) {
			var s = [];
			for(var i=0; i<number;i++) {
				s.push(this.getSentance(maxSize));
			}
			return s.join(' ');
		},

		this.getSentances = function() {
			var title = this.getSentance(6);
			var messages = [];
			var length = Math.floor(Math.random()*2)+2;

			// build a few bullet points
			while(messages.length < length) {
				var sentances = _.times(Math.floor(Math.random()*3)+2, this.getSentance.bind(this,6)).join(' ');
				messages.push(sentances);
			}

			var asString = title + '\n';
			asString+= _.map(messages,function(itm, key) {
				return (key+1) + '. ' + itm 
			}).join('\n');


			return {
				title: title,
				messages: messages,
				asString : asString
			};
		},

		this.getSentances2 = function() {
			return [
				'a. my title is longer than that my title',
				[
					'subitem 1',
					'subitem 2',
					'subitem 3'
				],
				'title 2',
				[	
					'subitem 4',
					'subitem 5',
					'subitem 6'
				]
			];
		}

	});



})(angular);
