(function() {
	
	'use strict';

	module.exports = function HomeController($scope, textService, speechFactory) {

		$scope.highlights = [];

		textService.getText('james')
		.then(function(res) {
			
	
			var text = res.data.index + '. ' + res.data.text.replace('%s', res.data.name);
	
			$scope.text = text;
			$scope.word = 'something';
			$scope.spoken = 'somrhingh';

			speechFactory.speak(text)
			.then(function onResolved(obj) {

					obj.on('onEnd', function() {
						$scope.ended=true;
						$scope.word = '';
						$scope.spoken = text;
						$scope.$apply();
					})

					obj.on('onError', function(err) { });

					obj.on('onBoundary', function(what) {
						$scope.word = what.word;
						$scope.spoken = what.spoken;
						$scope.$apply();
					});

				},
				function onFail(data) {
					console.log('speaking failed', data);
				});
		});

	};

})();