// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const { getWomenTeamPlayers } = require('../../middleware/players');
app.use('/', getWomenTeamPlayers);

// GET response for '/first-team'
app.get('/', function(req, res, next) {

	try {
		res.render('players', {
			title: 'Women\'s Team',
			goalkeepers: req.goalkeepers,
			defenders: req.defenders,
			midfielders: req.midfielders,
			strikers: req.strikers
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;