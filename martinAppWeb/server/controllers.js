
var Q = require('q');


module.exports= function() {

	var seneca = require('seneca')();
	seneca.client();


	function getHome(req, res, next) {

		if(req.user && req.user.name) {
			return res.redirect('/' + req.user.name);
		}

		res.render('home', {
			layout : false,
			title : 'my title',
			user : req.user || {}
		});

	}
	
	function getName(req, res, next) {

		if(req.user.name.toLowerCase() != req.params.name.toLowerCase()) {
			res.redirect('/' + req.user.name);
		}

		res.render('home', {
			layout : false,
			title : 'my title',
			user : req.user || {}
		});
				
	}

	function logout(req, res, next) {
		res.clearCookie('uuid');
		res.redirect('/');
	}

	return {
		getHome :getHome,
		getName : getName,
		logout : logout
	};


}