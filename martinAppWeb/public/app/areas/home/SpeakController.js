(function() {
	
	'use strict';

	var textService,
		speechFactory,
		userService;


	function getAndShowText($scope) {
		$scope.texts = $scope.texts || [];

		var name = userService.get().name;

		textService.getText(name)
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
						
						$scope.$apply();
						// loop
						getAndShowText($scope);

					});

					obj.on('onError', function(err) { });

					obj.on('onBoundary', function(what) {

						angular.extend($scope.texts[$scope.texts.length-1], {
							word : what.word,
							spoken : what.spoken
						});

						$scope.$apply();
					});

				},
				function onFail(data) {
					console.log('speaking failed', data);
				});
		});

	}

	module.exports = function SpeakController($scope, _textService, _speechFactory, _userService) {

		textService = _textService,
		speechFactory = _speechFactory;
		userService = _userService;

		$scope.texts = [];
		getAndShowText($scope);

	};

})();