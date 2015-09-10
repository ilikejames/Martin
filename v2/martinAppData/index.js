

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







