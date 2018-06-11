// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const fixtures = require('../../middleware/fixtures');
app.use('/', fixtures.getReservesTeamFixtures);

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
			preseason: req.fixtures.filter(match => match.competition == 9),
			regularSeason: req.fixtures.filter(match => match.competition > 9),
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