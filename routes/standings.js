// Require router dependencies
var express = require('express');
var app = express();

// Require the middleware
const standings = require('../middleware/standings');

// Get helper functions
const helpers = require('../helpers/fixtures');

// GET response for '/standings/premier-league'
app.use('/premier-league', standings.getEPLTable);

app.get('/premier-league', function(req, res, next) {

	try {
		res.render('standings/pl_standings', {
			title: 'Premier League Standings',
			epl: req.epl,
			helpers: helpers
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings/champions-league'
app.use('/champions-league', standings.getUCLTable);

app.get('/champions-league', function(req, res, next) {

	try {
		res.render('standings/cl_standings', {
			title: 'Champions League Standings',
			ucl: req.ucl
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings'
app.use('/', [standings.getEPLTable, standings.getUCLTable]);

app.get('/', function(req, res, next) {

	try {
		res.render('standings/standings', {
			title: 'Standings',
			epl: req.epl,
			ucl: req.ucl,
			helpers: helpers
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;