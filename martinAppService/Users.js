
var core = require('martinAppCore');
var _ = require('lodash');



module.exports = function Users(options) {

	this.add('role:api, type:user, cmd:get', getUser);
	this.add('role:api, type:user, cmd:create', createUser);
	this.add('role:api, type:user, cmd:update',  updateUser);


	function createUser(args, done) {

		/*
		cmd: "create"
		created: 1444408691993
		meta$: Object
		role: "api"
		transport$: Object
		tx$: "130l535d9ng8"
		type: "user"
		ungate$: true
		updated: 1444408691993
		user: Object
		uuid: "ee387ed3-9f3f-419a-94a8-dd15576e6ffd"
		__proto__: Object
		*/

		core.user.create(args.user)
		.then(function(data) {
			done(null, data);
		});
	}


	function getUser(args, done) {
		core.user.get(args.uuid)
		.then(function(data) {
			done(null, data);
		});
	}

	function updateUser(args, done) {

		core.user.update(args.user)
		.then(function(user) {
			done(null, user);
		});
	}

	return this;

}