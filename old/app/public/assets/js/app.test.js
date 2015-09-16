(function() {
	
	describe('ilj.common.directives.iljOneWordAtAtimeList', function() {

		var $complile, 
			$rootScope,
			$interval;

		beforeEach(module('my.templates'));
		beforeEach(module('ilj.common.directives'));

		beforeEach(inject(function(_$compile_, _$rootScope_, _$interval_){
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$interval = _$interval_;
		}));

		

		it('Replaces the element with the appropriate content when it is a simple array of text', function() {

			var $scope = $rootScope.$new();
			$scope.items =  ['item_1', 'item_2'];	
	
			var element = $compile('<ilj-one-word-at-a-time-list ilj-messages="items"></ilj-one-word-at-a-time-list>')($scope);

			$rootScope.$digest();

			$interval.flush(1000);

			var html = element.html();
			expect(html).toMatch(/item_1/);
			expect(html).toMatch(/item_2/);
			
		});

		it('Replaces the element with the appropriate content when it contains sub arrays', function() {

			var $scope = $rootScope.$new();
			$scope.items =  ['item_1', [ 'subitem_1', 'subitem_2']];
	
			var element = $compile('<ilj-one-word-at-a-time-list ilj-messages="items" ilj-speed="250"></ilj-one-word-at-a-time-list>')($scope);

			$rootScope.$digest();

			$interval.flush(1000);

			var html = element.html();
			expect(html).toMatch(/subitem_1/);
			expect(html).toMatch(/subitem_2/);
			
		});

		it('After 0ms no text should be displayed', function() {
			var $scope = $rootScope.$new();
			$scope.items =  ['item_1', 'item_2'];

			var element = $compile('<ilj-one-word-at-a-time-list ilj-messages="items" ilj-speed="250"></ilj-one-word-at-a-time-list>')($scope);

			$rootScope.$digest();

			$interval.flush(0);

			var html = element.html();
			expect(html).not.toMatch(/item_1/);
			expect(html).not.toMatch(/item_2/);

		});

		it('After 300ms only first text should be displayed', function() {
			var $scope = $rootScope.$new();
			$scope.items =  ['item_1', 'item_2'];

			var element = $compile('<ilj-one-word-at-a-time-list ilj-messages="items" ilj-speed="250"></ilj-one-word-at-a-time-list>')($scope);

			$rootScope.$digest();

			$interval.flush(300);

			var html = element.html();
			expect(html).toMatch(/item_1/);
			expect(html).not.toMatch(/item_2/);

		});


		it('Should throw a complete event when finished displaying', function() {

			var $scope = $rootScope.$new(),
				isComplete = false;
			$scope.items =  ['item_1', 'item_2'];
			$scope.$on('iljOneWordAtATimeList.complete', function() {
				isComplete = true;
			});

			var element = $compile('<ilj-one-word-at-a-time-list ilj-messages="items" ilj-speed="250"></ilj-one-word-at-a-time-list>')($scope);

			$rootScope.$digest();

			expect(isComplete).toBe(false);
			$interval.flush(1000);
			expect(isComplete).toBe(true);

		});


	});


})();


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


