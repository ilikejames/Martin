// mega.test.js

(function() {

	describe('ilj.services.core', function() {


		var textService,
			speak;

		beforeEach(module('ilj.core.services'));

		beforeEach(inject(function(_TextService_, _Speak_){

			textService = _TextService_;
			speak = _Speak_;

		}));



		describe('TextService', function() {

			it('Should return an object with title and messages', function() {

				expect(typeof textService.getSentances().title).toBe('string');

				expect(textService.getSentances().messages.length).toBeGreaterThan(0);

			});

		});


		describe('Speak', function() {
			it('Should return a url', function() {
				var url = speak('hello');

				expect(url.substr(0, 4)).toBe('http')
			});

			it('Should contain the text to be spoken encoded as a param', function() {
				var url = speak('qwertyuiop');
				expect(url.indexOf('q=qwertyuiop')).toBeGreaterThan(1);
			});
		});


	});


})();
