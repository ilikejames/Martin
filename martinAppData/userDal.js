
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



module.exports = function(dbConnection) {

	db = dbConnection;

	return {
		getCleanName : cleanName,
		getLastSeen : getLastSeen,
		setLastSeen : setLastSeen,
		getNewVisitorCount : getNewVisitorCount
	}

}


