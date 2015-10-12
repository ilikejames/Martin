

var Q = require('q');


module.exports= function api() {

	var seneca = require('seneca')();
	seneca.client();

	function setCookie(res, uuid) {
		res.cookie('uuid', uuid, { maxAge: 1000* 60 * 60 * 24 * 100, httpOnly: false, signed: true});
	}


	function saveUser(req, res, next) {
		var uuid = req.params.uuid;
		seneca.act({ role : 'api', type : 'user', cmd : 'create', user : req.body}, function(err, data) {
			setCookie(res, data.uuid);
			res.json(data);
		});
	}	

	function updateUser(req, res, next) {
		seneca.act({ role : 'api', type : 'user', cmd : 'update', user : req.req.body}, function(err, data) {
			setCookie(res, data.uuid);
			res.json(data);
		});
	}

	function getStatement(req, res, next) {

		console.log(req.params.name);

		// uid from cookie, or generate
		seneca.act({ role: 'api', type : 'statement', name : req.params.name }, function(err, data) {
			console.log(data);
			res.json(data);
		});

	}

	return {
		saveUser : saveUser,
		updateUser : updateUser,
		getStatement, getStatement
	};


}