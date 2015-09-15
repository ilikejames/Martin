
var sentanceCreator = require('./sentanceCreator');


// tests for textDal.js

describe('sentanceCreator', function() {


	describe('capitalize', function() {

		it('Should properly sentance case a string of text', function() {
			expect(sentanceCreator.capitalize('gerhard')).toEqual('Gerhard');
			expect(sentanceCreator.capitalize('gerhard richter')).toEqual('Gerhard Richter');
			expect(sentanceCreator.capitalize('GERHARD RICHTER')).toEqual('Gerhard Richter');
			expect(sentanceCreator.capitalize('_GERHARD')).toEqual('_gerhard');
		});

	});

	describe('create', function() {

		it('A sentance should start with a capital', function() {
			var sentance = sentanceCreator.create();
			var firstLetter = sentance.substring(0,1);
			expect(firstLetter).toEqual(firstLetter.toUpperCase());
		});

		it('A sentance should end with a "."', function() {
			var sentance = sentanceCreator.create();
			var lastLetter = sentance.slice(-1);
			expect(lastLetter).toEqual('.');
		});

		it('A sentance should contain the placeholder to replace the name with', function() {
			var sentance = sentanceCreator.create();
			expect(sentance.indexOf('%s')).toBeGreaterThan(-1);
		});

		it('Should be able to get a sentance with at least 5 words plus the name', function() {
			var sentance = sentanceCreator.create(5);
			expect(sentance.split(' ').length).toBeGreaterThan(5);
		});

		it('Should be able to get a sentance with maximum 10 words plus the name', function() {
			var sentance = sentanceCreator.create(10,10);
			expect(sentance.split(' ').length).toEqual(11); // name
		});

		it('Should get a sentance containing only the name placeholder', function() {
			var sentance = sentanceCreator.create(0,0);
			expect(sentance).toEqual('%s.');
		});

	})


});
	
