var Q = require('Q');
var dal = require('martinAppData');
var sentanceCreator = require('./sentanceCreator');



function sentanceCase(word) {
	var words = word.split(' '),
		len = words.length,
		s = [];

	for(var i=0, itm; itm = words[i]; i++) {
		s.push(itm.substr(0,1).toUpperCase() + itm.substr(1).toLowerCase());
	}
	return s.join(' ');
}


function getInitial(name, uid) {
	// gets current question index
	// creates next question. 
	// gets how long someone with "name" has been there
	// gets number of "names" visited

	var d = Q.defer();

	Q.spread([
		dal.text.getTextForName(name, sentanceCreator.create(0,23)),
		dal.user.getLastSeen(name),
		dal.user.getNewVisitorCount(name)
	], 
	function onGetInitialSpreadComplete(textResults, lastSeen, count) {

		console.log('onGetInitialSpreadComplete', arguments);

		var data = {
			index : textResults.index,
			lastSeen : lastSeen,
			totalCount : count,
			text : textResults.text, 
			name : sentanceCase(name)
		}

		// fire & forget
		dal.user.setLastSeen(name); 

		d.resolve(data);


	})
	.fail(d.reject);

	return d.promise;
	
}



module.exports = {
	sentanceCase : sentanceCase,
	getInitial : getInitial
}
