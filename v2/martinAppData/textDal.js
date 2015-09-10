
var q = require('q');

var db;


function cleanName(name) {
	// only standard characters allowed
	//return  name.replace(/[^A-Z0-9]/ig, "_").toLowerCase();
	return  name.replace(/\s/g, "_").toLowerCase();
}

function getIndex(name) {
	return db.llen(cleanName(name))
}

function getText(name, index) {
	return db.lindex(cleanName(name), index);
}

function saveText(name, text) {
	return db.rpush(cleanName(name), text);
}

function getPrevious(name, index, count) {
	var startIndex = Math.max(index-count, 0);
	var endIndex = index-1;
	return db.lrange(cleanName(name), startIndex, endIndex);
}


module.exports = function(dbConnection) {

	db = dbConnection;

	return {
		getCleanName : cleanName,
		getIndex : getIndex,
		getText : getText,
		saveText : saveText,
		getPrevious : getPrevious
	}

}


