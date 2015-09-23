
(function() {

	
	describe('app.common.services.TextService', function() {

		var textService,
			$httpBackend,
			$rootScope;


		beforeEach(module('app.common.services'));


		beforeEach(inject(function($injector, _$rootScope_, _TextService_){
			textService = _TextService_;
			$httpBackend = $injector.get('$httpBackend');
			$rootScope = _$rootScope_;
		}));


		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});


		it('Should make a call to the api', function() {

			$httpBackend.expectGET('/api/statement/james').respond({ obj : 1 });

			textService.getText('james')
			.then(function(response) {
				expect(response.data).toEqual({ obj : 1});
			});

			$httpBackend.flush();

		});


	});


})();


