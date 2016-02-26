'use strict';

var express    = require('express'),
app            = express(),
config = require('./server/config'),
mongoose       = require('mongoose'),
consolidate    = require('consolidate'),
swig           = require('swig'),
bodyParser     = require('body-parser'),
methodOverride = require('method-override'),
_              = require('lodash'),
passport = require('passport'),
jwt = require('jsonwebtoken'),
expressJwt = require('express-jwt');

/* ==========================================================
	MONGOOSE
============================================================ */
mongoose.connect('mongodb://localhost/tbmp', function(err){
  if(err) {
    console.error('\x1b[31m', 'Could not connect to MongoDB!');
    console.log(err);
  }
});

/* ==========================================================
	SETUP
============================================================ */
require('./server/config/passport.js')();
app.use(passport.initialize());
app.set('showStackError', true);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.enable('jsonp callback');
app.use(bodyParser.urlencoded({'extended':'true'}));
app.engine('server.html', consolidate.swig);
app.set('view engine', 'server.html');
app.set('views', __dirname + '/server/views');
app.use(express.static(__dirname + '/public'));
// Showing stack errors
app.set('showStackError', true);
// Enable jsonp
app.enable('jsonp callback');
app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

/* ==========================================================
CORS
============================================================ */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use('/api', expressJwt({ secret: config.jwtSecretKey }));

/* ==========================================================
ROUTES
============================================================ */
require('./server/routes.js')(app);

/* ==========================================================
ERRORS
============================================================ */
// '404' ----------------------------
app.use(function(req, res, next){
  res.status(404);

  if(req.accepts('html')) {
    return res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
  }

  if(req.accepts('json')) {
    return res.send({ error: 'Not found!'});
  }

  res.type('txt');
  res.send('Page not available');
});

// '500' ----------------------------
app.use(function(err, req, res, next){

// missing authorization header
	if (!req.headers.authorization) {
    console.error('error at %s\n', req.url, err.stack);
		res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
    return res.status(400).send('missing authorization header');
	}

	// expressJwt error
	// if (err.constructor.name === 'UnauthorizedError') {
	// 	//res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
	// 	res.status(401).send('Unauthorized');
	// }

  console.error('error at %s\n', req.url, err.stack);
  res.status(500).send('<pre>' + err.stack + '</pre>');
});

// process.on('uncaughtException', function(err) {
//     console.log(err);
// });

/* ==========================================================
	APP
============================================================ */
var server = app.listen(3000, function () {
  console.log('App listening at http://localhost:',server.address().port);
});

exports = module.exports = app;
