// Require router dependencies
const express = require('express');
const app = express();

// Connect and use the middleware
const fixtures = require('../../middleware/fixtures');
app.use('/', fixtures.getReservesTeamFixtures);

// Get Helper Functions
const { COMPETITIONS } = require('../../helpers/competitions.js');


// GET response for '/reserves-fixtures'
app.get('/', function(req, res, next) {

	try {
		let fixturesCount = req.fixtures.length;
		let lastMatch = (req.lastMatchID != null && req.lastMatchID >= 0 && req.lastMatchID < fixturesCount) ?
			req.fixtures[req.lastMatchID] : null;
		let nextMatch = (req.nextMatchID != null && req.nextMatchID >= 0 && req.nextMatchID < fixturesCount) ?
			req.fixtures[req.nextMatchID] : null;

		res.render('fixtures', {
			title: 'Reserves Team Schedule & Results',
			MATCH_STATUS: req.MATCH_STATUS,
			preseason: req.fixtures.filter(match => match.competition == COMPETITIONS.FRIENDLY),
			regularSeason: req.fixtures.filter(match => match.competition >= COMPETITIONS.PREMIER_LEAGUE_2 && match.competition <= COMPETITIONS.U19_UEFA_YOUTH_LEAGUE),
			lastMatch: lastMatch,
			nextMatch: nextMatch
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;