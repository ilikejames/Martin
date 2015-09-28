(function() {
	
	'use strict';

	module.exports = function Page2Controller($scope, textService, speechFactory) {

		console.log('Page2Controller');

		textService.getText('james')
		.then(function(res) {
			$scope.data = res.data;
			$scope.text = res.data.index + '. ' + res.data.text.replace('%s', res.data.name );

			speechFactory.speak($scope.text)
				.then(
					function onResolved(data) {
						console.log('speaking successful: ', data);
					},
					function onFail(data) {
						console.log('speaking failed', data);
					});
		});

	};

})();