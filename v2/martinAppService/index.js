// index.js

var seneca = require('seneca')()
var core = require('martinAppCore');



function statement( options ) { 

	this.add( 'role:api, cmd:statement', getStatement );

	//this.add( 'role:api, cmd:init', init )

	function getStatement(msg, respond) {
		// TODO: error handling
		core.getInitial(msg.name)
		.then(function(data) {
			respond( null, data);
		});

	}
}



seneca

.use( statement, {} )

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






