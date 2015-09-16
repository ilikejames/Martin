
var redisMock = require('fakeredis');

var redis = require('then-redis');
 
var db = redis.createClient({
  host: 	process.env.REDIS_HOST,
  port: 	process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  redisClient : redisMock
});


module.exports = db;
