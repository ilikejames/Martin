
// index.js

var express = require('express');
var app = express();
var controllers = require('./controllers')();

var hbs= require('express-handlebars');


var handlebars = hbs.create({
    helpers: {
        json: function (obj) { 
        	return JSON.stringify(obj, null, 4); 
        }
    }
});
 


app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

	

//app.use(express.logger());
//app.use(express.compress());
//app.use(express.urlencoded());
//app.use(express.cookieParser(process.env.COOKIE_SECRET)); //  || 'this-is-a-not-so-secret-string'


// ////////////////////////////////////////////////////////////////////////
// routes
// ////////////////////////////////////////////////////////////////////////

app.get('/', controllers.getHome);
app.get('/api/statement/:name', controllers.getStatement);

// ////////////////////////////////////////////////////////////////////////


app.listen(3000);

