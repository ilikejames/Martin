(function() {
	
	'use strict';

	module.exports = function HomeController($scope, textService, speechFactory) {

		console.log('HomeController');

		textService.getText('james')
		.then(function(res) {
			$scope.data = res.data;
			$scope.text = res.data.index + '. ' + res.data.text.replace('%s', res.data.name );

			speechFactory.speak($scope.text)
				.then(
					function onResolved(obj) {
						console.log('speaking successfully...', obj);

						obj.on('onStart', function(what) {
							console.log('onStart', what);
						});

						obj.on('onError', function(err) {
							console.log('homecontroller, fatal error in speechFactory');
						});

						obj.on('onBoundary', function(what) {
							console.log('onBoundary', what);
						});

						obj.on('onMark', function(what) {
							//console.log('onBoundary', what);
						});

					},
					function onFail(data) {
						console.log('speaking failed', data);
					});
		});

	};

})();