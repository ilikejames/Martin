
var Q = require('q');

var db;


// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////


function getTextForName(name, defaultText) {

	// TODO: move to redis LUA? But LUA is not implemented in fake-redis :(
	//var script = "eval \"return {redis.call('lindex', KEYS[1], redis.call('incr', KEYS[2])), redis.call('get', KEYS[2]) }\" 2  ':text' 'index:" + name + "'";

	return db.incr('index:' + cleanName(name))

	.then(function(index) {

		return db.lindex(':text', parseInt(index, 10) - 1)

		.then(function(text) {

			if(!text) {

				db.rpush(':text', defaultText);

				return  {
					index : index,
					text: defaultText
				};

			}

			return {
				index : index,
				text : text
			};

		});

	});

} 
 

// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////


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
		getPrevious : getPrevious,
		getTextForName : getTextForName
	}

}


