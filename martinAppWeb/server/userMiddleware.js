
var seneca = require('seneca')();
seneca.client();


module.exports = function UserSession(options) {

	options = options || {};
	options.unauthorisedUrl = options.unauthorisedUrl || '/';

	function onRequest(req, res, next) {

		if(req.signedCookies.uuid) {

			// is valid?
			seneca.act({role : 'api', type:'user', cmd: 'get', uuid : req.signedCookies.uuid }, 
				
				function onGetUid(err, data) {

					if(err) {
						res.clearCookie('uuid');
						return next();
					}

					if(data) {
						req.user = data;
						//req.user.uuid = req.signedCookies.uuid;
					}
					else {
						// kill cookie
						res.clearCookie('uuid');
						req.user = {
							isknown : false
						};
					}

					next();
				}
			);

		}
		else {
			next();			
		}
	};

	function requireAuthorized(req, res, next) {
		if(!req.user) {
			//console.log('unauthorized:', options.unauthorisedUrl);
			return res.redirect(options.unauthorisedUrl);
			//return next({code : 401});
		}
		next();
	};

	return {
		onRequest : onRequest,
		requireAuthorized : requireAuthorized
	};

}
