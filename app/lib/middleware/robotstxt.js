
module.exports = function handleRobotsTextRequest(req, res, next) {

	if ('/robots.txt' == req.url) {

		res.type('text/plain');
		res.send('User-agent: *\nAllow: *\n'); // crawl me
	    res.end();
	    return;
	}
	next();
}

