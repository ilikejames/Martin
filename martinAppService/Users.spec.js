
describe('martinAppService/Users.js', function() {

	var _ = require('lodash');
	var core =  require('martinAppCore');
	var q = require('q');
	var SenecaMock = require('./seneca.mock');
	var Users = require('./Users.js');

	//var d;

	beforeEach(function() {
		
		//d = q.defer();

		//spyOn(core.user, 'get').andReturn(d.promise);
		//spyOn(core.user, 'create').andReturn(d.promise);
		//spyOn(core.user, 'update').andReturn(d.promise);

	});


	it('It should handle; role:api, type:user, cmd:get', function(done) {

		var users = new SenecaMock(Users);

		spyOn(core.user, 'get').andCallFake(function() {
			var d= q.defer();
			d.resolve({ uuid : 23, name : 'martin' });
			return d.promise
		});

		users.act('role:api, type:user, cmd:get', { uuid : 23}, function(err, data) {
			expect(core.user.get).toHaveBeenCalled();
			expect(data).toEqual({uuid: 23, name : 'martin'});
			done();
		});

	});

	
	it('It should handle; role:api, type:user, cmd:create', function(done) {

		var users = new SenecaMock(Users);

		spyOn(core.user, 'create').andCallFake(function() {
			var d= q.defer();
			d.resolve({ uuid : 23, name : 'martin' });
			return d.promise
		});

		users.act('role:api, type:user, cmd:create', {name : 'martin'}, function(err, data) {
			expect(core.user.create).toHaveBeenCalled();
			done();
		});

	});

	it('It should handle; role:api, type:user, cmd:update', function(done) {

		var users = new SenecaMock(Users);

		spyOn(core.user, 'update').andCallFake(function() {
			var d= q.defer();
			d.resolve({ uuid : 23, name : 'martin' });
			return d.promise
		});

		users.act('role:api, type:user, cmd:update', {uuid: 23, name : 'martin'}, function(err, data) {
			expect(core.user.update).toHaveBeenCalled();
			done()
		});

	});
	



});