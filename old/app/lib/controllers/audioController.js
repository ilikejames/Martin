

var	Q = require('q'),
    _ = require('lodash'),
    express = require('express'),
	router = express.Router();

var request = require('request'),
	sprintf = require('sprintf-js');



router.get('/translate', getTranslation);


module.exports = router;



function getTranslation(req, res, next) {
	res.type('audio/mpeg');
	var url = sprintf.sprintf('http://translate.google.com/translate_tts?tl=%s&q=%s', req.query.lang || 'en', req.query.text.substr(0,99) );
	request.get(url).pipe(res);
}



	