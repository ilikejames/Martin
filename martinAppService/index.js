// index.js

var seneca = require('seneca')()
var core = require('martinAppCore');
var uuid = require('node-uuid');



function Statement( options ) { 

	this.add( 'role:api, cmd:statement', getStatement );

	function getStatement(msg, respond) {

		core.getTextItem(msg.name)

		.then(function(data) {
			respond( null, data);
		});

	}
}

function Uid(options) {

	this.add('role:api, cmd:uid', getUid);

	function getUid(msg, response) {
		response(null, { uid : uuid.v4() });
	}

}


seneca

.use( Statement, {} )
.use( Uid, {} )

.listen();

return;
/*
.act('role:web', {
	use:{

		prefix: '/api',

		pin: 'role:api,cmd: *',

		map:{
			'statement' : true,
		}
	}
});


var express = require('express')
var app = express()

// This is how you integrate Seneca with Express
app.use( seneca.export('web') )

app.listen(3000)
*/






