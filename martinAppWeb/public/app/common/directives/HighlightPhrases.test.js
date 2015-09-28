(function() {


	describe('app.common.directives.HighlightPhrase', function() {

		var $compile, 
			$rootScope,
			HighlightPhrase;


		beforeEach(module('app'));
		beforeEach(module('app.common.directives'));


		beforeEach(inject(function(_$rootScope_, _$compile_) {
			$rootScope = _$rootScope_;
			$compile = _$compile_;
		}));

		it('Should render and highlight the spoken and word', function() {

			var element = $compile('<highlight-phrases text="This is my text" spoken="This is my" word="my"></highlight-phrases>')($rootScope);
			$rootScope.$digest();
			expect(element.html()).toContain('<span class="spoken">This is <span class="word">my</span></span>');

		});

	});


})();