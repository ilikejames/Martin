

var urlParser = require('url');


module.exports =  function redirectTrailingSlashes(req, res, next) {

	// 301s on trailing slashes e.g. /something/ -> /something
	// good google-fu

	var endsInSlash = req.path!='/' && endswith(req.path, '/');

	if(!endsInSlash) {
		return next();
	}

    var url = req.path.substr(0,req.path.length-1);
    var url_parts = urlParser.parse(req.url, true);
    url += url_parts.search;

    res.redirect(301, url);

 }


function endswith(str, what) {
    return str.indexOf(what, str.length - what.length) !== -1;
}