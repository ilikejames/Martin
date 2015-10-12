
var userService = require('./userService');
var dal = require('martinAppData');
var uuid = require('node-uuid');
var q = require('q');


describe('martinAppCore/userService.js', function() {
	


	it('Should get an existing user', function(done) {

		spyOn(dal.user, 'getByUid').andCallFake(function() {
			var d = q.defer();
			d.resolve({uuid : 23, name : 'martin'});
			return d.promise;
		});

		userService.get(23)
		.then(function(user) {
			expect(user).toEqual({uuid : 23, name : 'martin'});
			expect(dal.user.getByUid).toHaveBeenCalled();
			done();
		});

	});

	
	it('Should create a user with an uuid', function(done) {

		spyOn(uuid, 'v4').andReturn('madeupid');
		spyOn(dal.user, 'setUidName').andCallFake(function() {
			var d = q.defer();
			d.resolve('ok');
			return d.promise;
		});

		userService.create({name : 'martin'})
		.then(function(user) {
			expect(user.uuid).toEqual('madeupid');
			expect(uuid.v4).toHaveBeenCalled();
			expect(dal.user.setUidName).toHaveBeenCalled();
			expect(user.created).not.toBe(undefined);
			expect(user.updated).not.toBe(undefined);
			done();
		});
	});

	it('Should update an existing user', function(done) {

		spyOn(dal.user, 'getByUid').andCallFake(function() {
			var d = q.defer();
			d.resolve({uuid : 23, name : 'martin', isSecondCall : false, updated : 10 });
			return d.promise;
		})
		spyOn(dal.user, 'setUidName').andCallFake(function() {
			var d = q.defer();
			d.resolve('ok');
			return d.promise;
		});

		userService.update({uuid : 23, isSecondCall : true, extra : 'param'})
		.then(function(user) {
			expect(dal.user.getByUid).toHaveBeenCalled();
			expect(dal.user.setUidName).toHaveBeenCalled();

			expect(user.updated).not.toBe(10); // should have update update timestamp;
			delete user.updated;
			delete user.created;
			expect(user).toEqual({
				uuid : 23,
				name : 'martin',
				isSecondCall : true,
				extra : 'param'
			});
			done();
		});


	});

	


});