
var db = require('./db.spec');

var textDal = require('./textDal')(db);


// tests for textDal.js

describe('textDal', function() {
	
	var collectionName;

	beforeEach(function(done) {
		collectionName = textDal.getCleanName((new Date().toString() + Math.random()));
		done();
	});

	afterEach(function(done) {
		done();
	});

	it('It should save a first text and be able to get it back at the first index', function(done) {


		textDal.saveText(collectionName, 'abc99999')
		.then(function(result) {

			expect(result).toEqual(1);

			textDal.getText(collectionName, 0)
			.then(function(result) {

				expect(result).toEqual('abc99999');
				done();

			});

		});

	});

	it('It should be able save 3 items and then retreive item at specific index', function(done) {
		textDal.saveText(collectionName, 'abc0')
		.then(function() {
			textDal.saveText(collectionName, 'abc1')
			.then(function() {

				textDal.saveText(collectionName, 'abc2')
				.then(function() {

					textDal.getText(collectionName,2)
					.then(function(result) {
						expect(result).toEqual('abc2');
						done();
					});

				});

			});
		})
	});


	it('Should have an index of 0 when no items in the list', function(done) {
		textDal.getIndex(collectionName)
		.then(function(result) {
			expect(result).toEqual(0);
			done();
		});
	});


	it('Should have an index of 1 when there is one item in the list', function(done) {
		textDal.saveText(collectionName, 'abc1')
		.then(function() {
			textDal.getIndex(collectionName)
			.then(function(result) {
				expect(result).toEqual(1);
				done();
			});
		})
		
	});

	it('Should be able to get the previous page of text', function(done) {

			db.rpush(collectionName, '0.1'); // 0
			db.rpush(collectionName, '0.2'); // 1
			db.rpush(collectionName, '0.3'); // 2
			db.rpush(collectionName, '0.4'); // 3
			db.rpush(collectionName, '0.5'); // 4
			db.rpush(collectionName, '0.6'); // 5
			db.rpush(collectionName, '0.7'); // 6
			db.rpush(collectionName, '0.8'); // 7
			db.rpush(collectionName, '0.9'); // 8
			
			textDal.getPrevious(collectionName, 8, 3)
			.then(function(results) {
				expect(results[0]).toEqual('0.6');
				expect(results[1]).toEqual('0.7');
				expect(results[2]).toEqual('0.8');
				done();
			});

	});
	

});