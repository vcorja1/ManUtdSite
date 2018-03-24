// Require router dependencies
var express = require('express');
var app = express();

// Require the middleware
const standings = require('../../middleware/standings');

// Also require the fixtures middleware
const fixtures = require('../../middleware/fixtures');
app.use('/', fixtures.getAcademyTeamFixtures);

// Get helper functions
const helpers = require('../../helpers/fixtures');

// GET response for '/reserves-standings'
app.use('/', standings.getU18PLTable);
app.use('/', standings.getU18PLCupTable);

app.get('/', function(req, res, next) {

	try {
		res.render('standings/academy_standings', {
			title: 'Academy Standings',
			fixtures: req.fixtures,
			u18_pl: req.u18_pl,
			u18_pl_cup: req.u18_pl_cup,
			helpers: helpers
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;