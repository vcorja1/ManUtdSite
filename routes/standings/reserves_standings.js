// Require router dependencies
var express = require('express');
var app = express();

// Require the middleware
const standings = require('../../middleware/standings');

// Also require the fixtures middleware
const fixtures = require('../../middleware/fixtures');
app.use('/', fixtures.getReservesTeamFixtures);

// Get helper functions
const helpers = require('../../helpers/fixtures');

// GET response for '/reserves-standings'
app.use('/', standings.getPL2Table);
app.use('/', standings.getPLInternationalCupTable);
app.use('/', standings.getYouthLeagueTable);

app.get('/', function(req, res, next) {

	try {
		res.render('standings/reserves_standings', {
			title: 'Reserves Standings',
			fixtures: req.fixtures,
			pl2: req.pl2,
			pl_int_cup: req.pl_int_cup,
			youth_league: req.youth_league,
			helpers: helpers
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;