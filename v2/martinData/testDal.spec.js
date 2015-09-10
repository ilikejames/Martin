
var redis = require('then-redis');
 
var db = redis.createClient({
  host: 	process.env.REDIS_HOST,
  port: 	process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});


var testDal = require('./textDal')(db);


// tests for textDal.js

describe('textDal', function() {
	
	var collectionName;

	beforeEach(function(done) {
		collectionName = new Date().toString() + Math.random();
		done();
	});

	afterEach(function(done) {
		// delete the collection
		db.del(collectionName);
		done();
		console.log('afterEach', collectionName);
	});


	it('It should save a first text and be able to get it back at the first index', function(done) {


		testDal.saveText(collectionName, 'abc')
		.then(function(result) {

			console.log('1. ', result);

			expect(result).toEqual(1);

			testDal.getText(collectionName, 0)
			.then(function(result) {

				console.log('2. ', result);

				expect(result).toEqual('abc');
				done();

			});

		});

	});

	it('It should be able save 3 items and then retreive item at specific index', function(done) {
		testDal.saveText(collectionName, 'abc0')
		.then(function() {
			testDal.saveText(collectionName, 'abc1')
			.then(function() {

				testDal.saveText(collectionName, 'abc2')
				.then(function() {

					testDal.getText(collectionName,2)
					.then(function(result) {
						expect(result).toEqual('abc2');
						done();
					});

				});

			});
		})
	});

	it('Should have an index of 0 when no items in the list', function(done) {
		testDal.getIndex(collectionName)
		.then(function(result) {
			expect(result).toEqual(0);
			done();
		});
	});

	it('Should have an index of 1 when there is one item in the list', function(done) {
		testDal.saveText(collectionName, 'abc1')
		.then(function() {
			testDal.getIndex(collectionName)
			.then(function(result) {
				expect(result).toEqual(1);
				done();
			});
		})
		
	});


	it('Should be able to get the previous page of text', function(done) {

			db.rpush(collectionName, '0.1');
			db.rpush(collectionName, '0.2');
			db.rpush(collectionName, '0.3');
			db.rpush(collectionName, '0.4');
			db.rpush(collectionName, '0.5');
			db.rpush(collectionName, '0.6');
			db.rpush(collectionName, '0.7');
			db.rpush(collectionName, '0.8');
			db.rpush(collectionName, '0.9');
			
			testDal.getPage(collectionName, -1, 3)
			.then(function(results) {
				//done();
				//expect(results[0]).toEqual('0.7')
			});


	});





});