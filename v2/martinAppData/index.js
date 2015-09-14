

var redis = require('then-redis');


var db = redis.createClient({
  host: 	process.env.REDIS_HOST,
  port: 	process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});


var dal = {
	text : require('./textDal')(db),
	user : require('./userDal')(db)
};


module.exports = dal;


/*
function data() {

	var db = redis.createClient({
		host: 	process.env.REDIS_HOST,
		port: 	process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD
	});


	this.text = require('./textDal')(db);
	this.user = require('./userDal')(db); 
	
	db.on("error", function (err) {
		console.log('error!')
	});
}
module.exports = data;
*/








