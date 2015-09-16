
var	Q = require('q'),
    _ = require('lodash'),
    express = require('express'),
	router = express.Router();



router.get('', getHomePage);

module.exports = router;



function getHomePage(req, res, next) {
	res.render('layouts/home.html', {});
}



	