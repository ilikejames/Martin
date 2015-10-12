
var Q = require('Q'),
	uuid = require('node-uuid'),
	_ = require('lodash'),
	dal = require('martinAppData');



function getUser(uid) {

	return dal.user.getByUid(uid)
	.then(function onGetUser(result) {
		return result;
	});

}

function createUser(user) {

	user.uuid = user.uuid || uuid.v4();

	_.extend(user, { 
		created: (new Date).getTime(), 
		updated:  (new Date).getTime()
	});
	

	return dal.user.setUidName(user.uuid, user)
	.then(function onSetUser(result) {
		return user;
	});

}

function updateUser(user) {

	return dal.user.getByUid(user.uuid)
	.then(function(orig) {

		if(!orig) {
			return null;
		}

		var result = _.extend({}, orig, user, {updated: (new Date).getTime()});

		return dal.user.setUidName(uuid, result)
		.then(function(data) {
			return result;
		});
	});

}



module.exports = {
	get : getUser,
	create : createUser,
	update : updateUser
}
