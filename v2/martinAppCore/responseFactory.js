var Q = require('Q');
var dal = require('martinAppData');
var sentanceCreator = require('./sentanceCreator');



function getTextItem(name, uid) {

	var d = Q.defer();

	Q.spread([
		dal.text.getTextForName(name, sentanceCreator.create(0,23)),
		dal.user.getLastSeen(name),
		dal.user.getNewVisitorCount(name)
	], 
	function onGetInitialSpreadComplete(textResults, lastSeen, count) {

		var data = {
			index : textResults.index,
			lastSeen : lastSeen,
			totalCount : count,
			text : textResults.text, 
			name : sentanceCreator.capitalize(name)
		}

		// fire & forget
		dal.user.setLastSeen(name); 

		d.resolve(data);

	})
	.fail(d.reject);

	return d.promise;
	
}



module.exports = {
	getTextItem : getTextItem
}
