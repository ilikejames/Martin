
var db = require('./db.spec');

var userDal = require('./userDal')(db);


// tests for textDal.js

describe('textDal', function() {
	
	var collectionName;

	beforeEach(function(done) {
		done();
	});

	afterEach(function(done) {
		done();
	});


	it('There should be no epoch on a first visit', function(done) {
		userDal.getLastSeen('newuser')
		.then(function(result) {
			expect(result).toBe(null); // perhaps null?
			done();
		});
	});


	it('Should be able to log a visit and then get it later', function(done) {

		userDal.setLastSeen('newuser2')
		.then(function(result) {
			setTimeout(function() {
				userDal.getLastSeen('newuser2')
				.then(function(result) {

					expect(parseInt(result)).toBeGreaterThan(new Date().getTime()-1000);	// after 1 seconds ago
					expect(parseInt(result)).toBeLessThan(new Date().getTime()+1);	// before now

					done();

				},200);
			})
		})
	});


	it('A new visitor name should have a visit count of 1', function(done) {
		userDal.getNewVisitorCount('newuser3')
		.then(function(result) {
			expect(result).toEqual(1);
			done();
		})
	});


	it('A second visitor name should have a visit count of 2', function(done) {
		userDal.getNewVisitorCount('newuser4')
		.then(function(result) {

			userDal.getNewVisitorCount('newuser4')
			.then(function(result) {
				expect(result).toEqual(2);
				done();
			});

		});
	});


});