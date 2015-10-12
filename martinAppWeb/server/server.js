
// index.js

var express = require('express');
var app = express();
var controllers = require('./controllers')();


 
app.set('view engine', 'ejs');  
app.set('views', __dirname + '/views');



app.use(require('express-favicon')(__dirname + '/../public/assets/images/favicon.ico'));
app.use(express.static(__dirname + '/../public'));


app.use(require('express-logger')({path: __dirname + '/../logs/log.txt'}));


// TODO: load packages
//app.use(express.compress());
//app.use(express.urlencoded());

var bodyParser = require('body-parser');
app.use(bodyParser.json() );       
app.use(bodyParser.urlencoded({ extended: true })); 



var cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.COOKIE_SECRET || 'this-is-a-not-so-secret-string'));


// ////////////////////////////////////////////////////////////////////////
// routes
// ////////////////////////////////////////////////////////////////////////

var userDetails = require('./userMiddleware')({ unauthorizedUrl : '/' });

app.use(userDetails.onRequest);


app.get('/', controllers.getHome);
app.get('/logout', controllers.logout);
//app.post('/', controllers.saveName);
app.get('/:name', userDetails.requireAuthorized, controllers.getName);

var api =require('./api.js')();

app.get('/api/statement/:name', userDetails.requireAuthorized, api.getStatement);
app.patch('/api/user/:uuid', api.updateUser);
app.post('/api/user', api.saveUser);



app.use(function onError(err, req, res, next) {
	console.log('onError', err);
});

// ////////////////////////////////////////////////////////////////////////


app.listen(3000);

