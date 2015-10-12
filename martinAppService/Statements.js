
var core = require('martinAppCore');


module.exports = function Statements( options ) { 

	this.add( 'role:api, type:statement', getStatement );

	function getStatement(msg, respond) {

		core.sentance.getTextItem(msg.name)

		.then(function(data) {
			respond( null, data);
		});

	}
}