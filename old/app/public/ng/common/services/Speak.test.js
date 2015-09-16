

(function() {

		describe('ilj.common.services.Speak', function() {

		var speak;

		beforeEach(module('ilj.common.services'));

		beforeEach(inject(function(_Speak_){
			speak = _Speak_;
		}));


		describe('Speak', function() {

			it('Should contain the text to be spoken encoded as a param', function() {
				var url = speak('qwertyuiop', 'en');
				expect(url.indexOf('text=qwertyuiop')).toBeGreaterThan(1);
			});
			
		});


	});


})();

