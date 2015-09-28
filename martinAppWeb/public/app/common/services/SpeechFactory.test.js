
(function() {

	
	describe('app.common.services.SpeechFactory', function() {

		var speechFactory,
			$rootScope,
			$timeout;


		beforeEach(module('app.common.services'));


		beforeEach(inject(function($injector, _$rootScope_, _$timeout_, _SpeechFactory_) {

			speechFactory = _SpeechFactory_;
			$rootScope = _$rootScope_;
			$timeout = _$timeout_;

		}));


		afterEach(function() {
		});


		it('It should resolve voices when there are some', function(done) {

			spyOn(window.speechSynthesis, 'getVoices').and.returnValue([1,2,3]);

			speechFactory.getVoices()
			.then(function(voices) {
				expect(voices).toEqual([1,2,3]);
				done();
			});

			$timeout.flush();

		});
		

		it('It should reject voices where there are not any', function(done) {

			spyOn(window.speechSynthesis, 'getVoices').and.returnValue([]);

			speechFactory.getVoices()
			.then(
				function onSuccess() {}, 
				function onFail(err) {
					expect(err).toEqual('timeout');
					done();
				}
			);

			// yea, not great but it should attempt 3 times with a pause inbetween
			$timeout.flush();
			$timeout.flush();
			$timeout.flush();

		});



	});


})();


