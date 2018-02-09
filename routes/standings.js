// Require router dependencies
var express = require('express');
var app = express();

// Require the middleware
const standings = require('../middleware/standings');

// GET response for '/standings/premier-league'
app.use('/premier-league', standings.getEPLTable);

app.get('/premier-league', function(req, res, next) {

	try {
		res.render('standings/pl_standings', {
			title: 'Premier League Standings',
			epl: req.epl
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings'
app.use('/', standings.getEPLTable);

app.get('/', function(req, res, next) {

	try {
		res.render('standings/standings', {
			title: 'Standings',
			epl: req.epl
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;