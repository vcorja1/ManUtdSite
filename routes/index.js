// Require router dependencies
var express = require('express');
var app = express();

// Connect and use other routes
const standings = require('./standings');
app.use('/standings', standings);
const staff = require('./staff');
app.use('/staff', staff);
const kits = require('./kits');
app.use('/kits', kits);

// GET response for '/'
app.get('/', function(req, res, next) {

	try {
		res.render('index', {
			title: 'Home Page'
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// The 404 route
app.get('*', function(req, res, next) {

	try {
		res.render('error', {
			title: 'Page Not Found - Manchester United Fan Website'
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;