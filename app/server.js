
var _ = require('lodash'),
    Q = require('q');

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    swig = require('swig'),
    path = require('path');


var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var compression = require('compression');


// ============================================================================================================================
// init engine
// ============================================================================================================================

app.locals.cache = "memory"
app.set('port', process.env.PORT || 8001);
app.set('views', path.join(__dirname, '/views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', process.env.NODE_ENV=='production');
app.set('strict routing', true);    // end slashes not valid good google karma


app.use(require('serve-favicon')(__dirname + '/public/assets/images/favicon.ico'));
app.use(require('method-override')());
app.use(session({ 
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8' 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('multer')());
app.use(express.static(path.join(__dirname, '/public')));

console.log('path: ', path.join(__dirname, '/public'));

// logging after to static
app.use(logger('dev'));


// SWIG server templates
swig.setDefaults({ 
    cache: (process.env.NODE_ENV=='production' ? 'memory' : false),  
    loader: swig.loaders.fs(__dirname + '/public/views') 
});




// gzip
app.use(compression());




// ============================================================================================================================
// custom middleware
// ============================================================================================================================

app.use(require('./lib/middleware/robotstxt'));
app.use(require('./lib/middleware/redirectTrailingSlashes'));



// ============================================================================================================================
// controllers & routing
// ============================================================================================================================

app.use('/', require('./lib/controllers/mainController'));

app.use('/audio', require('./lib/controllers/audioController'));


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handling
if ('production' != app.get('env')) {
    app.use(require('errorhandler')());
}
else {
    app.use(onErrorHandler);
}





// ============================================================================================================================
// start servers
// ============================================================================================================================
// http
server.listen(app.get('port'), function(){
  console.log('Started HTTP server on port  ' + app.get('port'));
});







function onErrorHandler(err, req, res, next) {

    if(!err) return next();

    var code = (err && err.status_code) || 500;

    res.render('layouts/error_XXX.html', { code : code, error : err });
}











