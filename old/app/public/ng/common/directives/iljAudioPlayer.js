
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