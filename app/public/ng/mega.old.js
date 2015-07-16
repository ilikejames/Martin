

// ////////////////////////////////////////////////////////////////////
// core/services
// ////////////////////////////////////////////////////////////////////

(function() {

	'use strict';

	var module = angular.module('ilj.core.services', []);

	module.service('TextService', function() {

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

			console.log(asString);

			return {
				title: title,
				messages: messages,
				asString : asString
			};
		},

		this.getSentances2 = function() {
			return [
				{ id: 1, 
				value : 'a. my title is longer than that my title'},
				[
					{id: 2, value : 'subitem 1',
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

	module.factory('Speak', function() {
		return function speakText(textToSpeak, lang) {
			lang = lang || 'en';
			return 'http://tts-api.com/tts.mp3?q=' + encodeURIComponent(textToSpeak);
			return 'http://translate.google.com/translate_tts?tl='+ lang +'&q=' + encodeURIComponent(textToSpeak);
		};
	});




})();




// ////////////////////////////////////////////////////////////////////
// 
// ////////////////////////////////////////////////////////////////////



(function() {

	'use strict';
	
	var module = angular.module(
		'ilj.areas.statements', 
		[
			'ngRoute', 'ilj.core.services', 'ilj.core.directives'
		]);

	module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

			$routeProvider.when('/', {
				templateUrl : '/views/partials/greetingMessage.html',
				controller : 'GreetingContoller',
				// resovle ?
			})
			.when('/fuckyou', {
				templateUrl : '/views/partials/fuckyou.html'
			})
			.when('/go2', {
				templateUrl : '/views/partials/greetingMessage2.html',
				controller : 'Greeting2Contoller'
			})

	}]);

	// wrong way
	module.controller('FuckYouController', ['$scope', function ($scope) {
		console.log('Do nothing');
		this.insult = 'Fuck you!';
	}]);
	
	module.controller('EditInsultController', function() {
		this.message = "hate";
	});
	
	
	module.controller('GreetingContoller', ['TextService', 'Speak', '$scope' ,function(textService, speakFactory, $scope) {
		var messages = textService.getSentances();

		$scope.messageObj = messages;
		$scope.sound = {
			url : speakFactory(messages.asString, 'en')
		}

	}]);

	module.controller('Greeting2Contoller', ['TextService', 'Speak', '$scope', function(textService, speakFactory, $scope) {
		var messages = textService.getSentances2();
		$scope.items = messages;
	}])


})();




// ////////////////////////////////////////////////////////////////////
// ilj
// ////////////////////////////////////////////////////////////////////


(function() {
	'use strict';
	var module = angular.module('ilj', ['ilj.areas.statements']);
})();





(function() {

	'use strict';

	var module = angular.module('ilj.core.directives', []);

	module.directive('iljSpeakTheText', [function() {
		return {

			restrict: 'E', 
			
			templateUrl : '/views/partials/speakTheText.html', 

			scope: {
		      soundUrl : '=iljSoundUrl'
		    }
		}

	}]);



	module.directive('iljOneWordAtATimeList', [ '$interval', function($interval) {

		return {

			templateUrl: '/views/partials/oneWordAtATimeList.html',

			scope: {
				iljMessages: '&'
			},

			link: function($scope, $element, $attributes) {
				
				$scope.isString = function(itm) {
					return angular.isString(itm);
				}
				$scope.isArray = function(itm) {
					return angular.isArray(itm);
				}

				var counter = 0,
					isAtEnd = false;

				var timer = $interval(function () {
					console.log(isAtEnd, counter);
					!isAtEnd && counter++;
				}, 700);


				function getPartOfSentance(item, length, counter) {
					var words=item.split(' '),
						isWithinCurrentString = length + words.length >= counter;

					if(isWithinCurrentString) {
						return words.slice(0, counter - length).join(' ');
					}
					else {
						return item;
					}

				}

				$scope.getItems = function() {

					//if(isAtEnd) {
					//	return $scope.iljMessages()
					//}

					console.log('getItems');


					var length = 0,
						index = 0,
						messages = [],
						messagesLength = $scope.iljMessages().length;


					while(counter >= length && messagesLength>index) {

						var item = $scope.iljMessages()[index];

						if(angular.isString(item)) {

							var newSentance = getPartOfSentance(item, length, counter);
							messages.push(newSentance);
							length += newSentance.split(' ').length;


							if(newSentance != item) {
								// more remaining
								console.log('string', messages);
								return messages;
							}
						}

						else if(angular.isArray(item)) {

							var subindex = 0,
								submessages = [];

							while(counter > length && item.length>subindex) {
								var subitem = item[subindex];
								var newSentance = getPartOfSentance(subitem, length, counter);
								submessages.push(newSentance);
								length += newSentance.split(' ').length;

								if(newSentance != subitem ) {
									messages.push(submessages);
									console.log('array', messages);

									return messages;
								}
								subindex ++;
							}
							messages.push(submessages);
						}

						index++;

					}

					isAtEnd = messages.length == messagesLength && 
							angular.equals(messages, $scope.iljMessages())


					return $scope.iljMessages();
				}


			}
		}

	}]);
	


	module.directive('iljOneWordAtATime', ['$interval', function($interval) {
		return {

			templateUrl: '/views/partials/oneWordAtATime.html',

			scope: {
				iljTitle: '&',
				iljMessages: '&'
			},

			link: function ($scope, $element, $attributes) {

				var counter = 0;

				var timer = $interval(function () {
					counter++;
				}, 200);


				$element.on('$destroy', function() {
		        	$interval.cancel(timer);
		        });

				$scope.getTitle = function () {
					// if 0 return '';
					var tmp = $scope.iljTitle().split(' ');
					return tmp.slice(0,counter).join(' ');
				};

				$scope.getMessages = function() {

					var length = $scope.iljTitle().split(' ').length;

					if(counter <= length) {
						return [];
					}

					var messages = [],
						index = 0;

					while(counter>length && index < $scope.iljMessages().length) {
						var message = $scope.iljMessages()[index],
							messageLength = message.split(' ').length;
		
						if(counter > messageLength + length) {
							messages.push(message);
							length+=messageLength;
							index++;
						}
						else {
							var words=  message.split(' ');
							messages.push(
								words.slice(0, counter - length).join(' ')
							);
							return messages;
						}
					}

					$interval.cancel(timer);

					return messages;
				}

			}
		};

	}]);



})();



