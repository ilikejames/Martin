
(function(angular, undefined) {

	'use strict';
	
	angular.module('ilj.areas.statements')
		
	.controller('NewGreetingController', ['TextService', 'Speak', '$scope', function(textService, speakFactory, $scope) {
		
		var messages = [
			textService.getNumberOfSentances(1,8),
			[]
		];

		$scope.language = 'it'
		$scope.items = messages;
		$scope.soundUrl = speakFactory(messages[0], $scope.language);

		var textFinished = false, 
			soundFinished = false;

		function doNext() {
			var a = textService.getNumberOfSentances(1 + Math.floor(Math.random()*3), 10);
			$scope.items[1].push(a);
			$scope.soundUrl = speakFactory($scope.items[1].length + '. ' + a, $scope.language);
			textFinished = false;
			soundFinished = true;
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
