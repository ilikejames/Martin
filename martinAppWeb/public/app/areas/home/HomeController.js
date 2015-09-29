(function() {
	
	'use strict';

	function getAndShowText($scope, textService, speechFactory) {
		$scope.texts = $scope.texts || [];

		textService.getText('james')
		.then(function(res) {
			
			var text = res.data.index + '. ' + res.data.text.replace('%s', res.data.name);
	
			$scope.texts.push({
				index : res.data.index,
				text : text,
				word : '',
				spoken : ''
			});
		
			speechFactory.speak(text)
			.then(function onResolved(obj) {

					obj.on('onEnd', function() {

						angular.extend($scope.texts[$scope.texts.length-1], {
							word : ''
						});
						
						
						//o.ended=true;
						//$scope.word = '';
						//$scope.spoken = text;
						$scope.$apply();
						// loop
						getAndShowText($scope, textService, speechFactory);

					});

					obj.on('onError', function(err) { });

					obj.on('onBoundary', function(what) {

						angular.extend($scope.texts[$scope.texts.length-1], {
							word : what.word,
							spoken : what.spoken
						})

						$scope.$apply();
					});

				},
				function onFail(data) {
					console.log('speaking failed', data);
				});
		});

	}

	module.exports = function HomeController($scope, textService, speechFactory) {

		$scope.texts = [];
		getAndShowText($scope, textService, speechFactory);

		/*

		textService.getText('james')
		.then(function(res) {
			
	
			var text = res.data.index + '. ' + res.data.text.replace('%s', res.data.name);
	
			$scope.text = text;
		
			speechFactory.speak(text)
			.then(function onResolved(obj) {

					obj.on('onEnd', function() {
						$scope.ended=true;
						$scope.word = '';
						$scope.spoken = text;
						$scope.$apply();
					});

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
		*/

	};

})();