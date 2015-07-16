
(function() {

	describe('ilj.common.services.TextService', function() {

		var textService,
			speak;

		beforeEach(module('ilj.common.services'));

		beforeEach(inject(function(_TextService_){

			textService = _TextService_;

		}));


		describe('TextService', function() {

			it('Should return an object with title and messages', function() {

				expect(typeof textService.getSentances().title).toBe('string');

				expect(textService.getSentances().messages.length).toBeGreaterThan(0);

			});

		});

	});


})();


