
(function() {

	
	describe('app.common.services.TextService', function() {

		var textService,
			$httpBackend,
			getTextRequest;


		beforeEach(module('app.common.services'));

		beforeEach(inject(function($injector, _TextService_){

			textService = _TextService_;
			$httpBackend = $injector.get('$httpBackend');

			debugger;

			getTextRequest = $httpBackend.when('GET', '/api/statement/james')
                            .respond({ obj : 1 });

		}));


		afterEach(function(done) {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
			done();
		});



		it('Should make a call to the api', function(done) {

			$httpBackend.expectGET('/api/statement/james');

			textService.getText('james')
			.then(function(response) {
				expect(response.data).toEqual({ obj : 1});
				done();
			});

			$httpBackend.flush();

		});


	});


})();


