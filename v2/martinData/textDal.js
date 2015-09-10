
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

function getPage(name, index, size) {
	// listing should always be backwards...
	// LIFO style
	var startIndex = Math.max(index-size, 10);
	var endIndex = Math.min(index, index+size);
	return db.lrange(cleanName(name), startIndex, endIndex);
}



module.exports = function(dbConnection) {

	db = dbConnection;

	return {
		getIndex : getIndex,
		getText : getText,
		saveText : saveText,
		getPage : getPage
	}

}


