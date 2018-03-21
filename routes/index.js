// Require router dependencies
var express = require('express');
var app = express();

// Connect and use other routes
/* ----  FIXTURES  ---- */
const fixtures = require('./fixtures/fixtures');
app.use('/fixtures', fixtures);
const reserves_fixtures = require('./fixtures/reserves_fixtures');
app.use('/reserves-fixtures', reserves_fixtures);
const academy_fixtures = require('./fixtures/academy_fixtures');
app.use('/academy-fixtures', academy_fixtures);

/* ----  STANDINGS  ---- */
const standings = require('./standings');
app.use('/standings', standings);

/* ----  STAFF  ---- */
const staff = require('./staff');
app.use('/staff', staff);

/* ----  TROPY ROOM  ---- */
const trophy_room = require('./trophy_room');
app.use('/trophy-room', trophy_room);

/* ----  KITS  ---- */
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