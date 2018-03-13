// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const fixtures = require('../../middleware/fixtures');
app.use('/', fixtures.getFirstTeamFixtures);
app.use('/', fixtures.getLiveScore);

const helpers = require('../../helpers/fixtures');

// GET response for '/fixtures'
app.get('/', function(req, res, next) {

	try {
		let fixturesCount = req.fixtures.length;
		let lastMatch = (req.lastMatchID != null && req.lastMatchID >= 0 && req.lastMatchID < fixturesCount) ?
			req.fixtures[req.lastMatchID] : null;
		let nextMatch = (req.nextMatchID != null && req.nextMatchID >= 0 && req.nextMatchID < fixturesCount) ?
			req.fixtures[req.nextMatchID] : null;
		console.log(req);
		console.log(lastMatch);
		console.log(nextMatch);

		res.render('fixtures/fixtures', {
			title: 'Schedule & Results',
			fixtures: req.fixtures,
			lastMatch: lastMatch,
			nextMatch: nextMatch,
			helpers: helpers
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;