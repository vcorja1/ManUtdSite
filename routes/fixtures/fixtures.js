// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const fixtures = require('../../middleware/fixtures');
app.use('/', fixtures.getFirstTeamFixtures);
app.use('/', fixtures.getLiveScore);

// GET response for '/fixtures'
app.get('/', function(req, res, next) {

	try {
		res.render('fixtures/fixtures', {
			title: 'Schedule & Results',
			fixtures: req.fixtures,
			lastMatch: req.lastMatch,
			nextMatch: req.nextMatch
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;