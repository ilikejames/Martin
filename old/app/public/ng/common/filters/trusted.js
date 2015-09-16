
(function(angular, undefined) {
	
	var module = angular.module('ilj.common.filters');

	module.filter('trusted', ['$sce', function ($sce) {
		return function(url) {
		    return $sce.trustAsResourceUrl(url);
		};
	}]);


})(angular);