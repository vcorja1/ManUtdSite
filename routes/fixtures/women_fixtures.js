// Require router dependencies
const express = require('express');
const app = express();

// Connect and use the middleware
const { getWomenTeamFixtures } = require('../../middleware/fixtures');
app.use('/', getWomenTeamFixtures);

// Get Helper Functions
const { COMPETITIONS } = require('../../helpers/competitions.js');


// GET response for '/fixtures'
app.get('/', function(req, res, next) {

	try {
		let fixturesCount = req.fixtures.length;
		let lastMatch = (req.lastMatchID != null && req.lastMatchID >= 0 && req.lastMatchID < fixturesCount) ?
			req.fixtures[req.lastMatchID] : null;
		let nextMatch = (req.nextMatchID != null && req.nextMatchID >= 0 && req.nextMatchID < fixturesCount) ?
			req.fixtures[req.nextMatchID] : null;

		res.render('fixtures', {
			title: 'Women\'s Team Schedule & Results',
			MATCH_STATUS: req.MATCH_STATUS,
			preseason: req.fixtures.filter(match => match.competition == COMPETITIONS.FRIENDLY),
			regularSeason: req.fixtures.filter(match => match.competition >= COMPETITIONS.FA_WOMEN_SUPER_LEAGUE && match.competition <= COMPETITIONS.FA_WSL_CUP),
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