
var Q = require('q');


module.exports= function() {

	var seneca = require('seneca')();
	seneca.client();

	function getStatement(req, res, next) {

		console.log(req.params.name);

		// uid from cookie, or generate
		seneca.act({ role: 'api', cmd: 'statement', name : req.params.name }, function(err, data) {
			console.log(data);
			res.json(data);
		});

	}


	function getUid(cookies) {

		var d = Q.defer();

		if(cookies['uuid']) {
			callback(null, cookies['uuid']);
		}

		seneca.act( { role : 'api', cmd : 'uid' }, function(err, data) {
			if(err) return d.reject(err);
			d.resolve(data);
		});

		return d.promise;
	}


	function getHome(req, res, next) {

		getUid(req)
		.then(function(uuid) {
			console.log('uuid', uuid);

			res.render('home', {
				layout : false,
				title : 'my title',
				uuid: uuid
			});
			//res.json({uuid : uuid});
		})
		.catch(function() {

		});
	}

	return {
		getStatement : getStatement,
		getHome :getHome
	};


}