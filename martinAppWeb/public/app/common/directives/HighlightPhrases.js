(function() {

	'use strict';

	module.exports = function HighlightPhrases($interval, $sce) {

		return {

			restrict : 'E',

			templateUrl: 'common/directives/HighlightPhrases.htm',

			scope: {
				text : '@',
				number : '@',
				word : '@',
				spoken : '@'
			},

			link : function($scope, $element, $attributes) {

				$scope.getHighlightedText = function() {

					var spoken  = $scope.spoken || '',
						n = spoken.toLowerCase().lastIndexOf($scope.word.toLowerCase()),
						spokenWithWord =  spoken.slice(0, n) + spoken.slice(n).replace($scope.word, '<span class="word">' + $scope.word + '</span>');

					var s = $scope.text.replace(spoken, '<span class="spoken">' + spokenWithWord + '</span>')

					return $sce.trustAsHtml(s);
				}

				
			}
		};

	};

})();