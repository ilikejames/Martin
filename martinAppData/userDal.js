
var q = require('q');

var db;


function cleanName(name) {
	// only standard characters allowed
	//return  name.replace(/[^A-Z0-9]/ig, "_").toLowerCase();
	return  name.replace(/\s/g, "_").toLowerCase();
}

function getLastSeen(name) {
	return db.get('last:' + cleanName(name));
}

function setLastSeen(name) {
	return db.set('last:' + cleanName(name), new Date().getTime());
}

function getNewVisitorCount(name) {
	return db.incr('visits:' + cleanName(name));
}

function getByUid(uid) {
	var d = q.defer();
	db.get('user:' + uid)
	.then(function(data) {
		d.resolve(JSON.parse(data));
	});
	return d.promise;
}

function setUidName(uid, user) {
	return db.set('user:' + uid, JSON.stringify(user));
}

module.exports = function(dbConnection) {

	db = dbConnection;

	return {
		getByUid : getByUid,
		setUidName : setUidName,
		getCleanName : cleanName,
		getLastSeen : getLastSeen,
		setLastSeen : setLastSeen,
		getNewVisitorCount : getNewVisitorCount
	}

}


