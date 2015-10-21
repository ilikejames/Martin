(function() {

	'use strict';


	module.exports = function HighlightPhrases($interval, $sce, $anchorScroll, $timeout) {

		return {

			restrict : 'E',

			templateUrl: 'common/directives/HighlightPhrases.htm',

			scope: {
				text : '@',
				number : '@',
				word : '@',
				spoken : '@',
			},


			link : function($scope, $element, $attributes) {

				// scroll to position
				$timeout(angular.bind({}, $anchorScroll, 'speak_' + $scope.number),100);

	
				$scope.getHighlightedText = function() {

					var spoken  = $scope.spoken || '',
						word = $scope.word || '';

					var wordIndex = spoken.toLowerCase().lastIndexOf(word.toLowerCase());
					var spokenWithWord =  spoken.slice(0, wordIndex) + spoken.slice(wordIndex).replace(word, '<span class="word">' + word + '</span>');
					var s = $scope.text.replace(spoken, '<span class="spoken">' + spokenWithWord + '</span>');

					return $sce.trustAsHtml(s);
				};

				
			}
		};

	};

})();