// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const { getAcademyTeamPlayers } = require('../../middleware/players');
app.use('/', getAcademyTeamPlayers);

// GET response for '/academy-team'
app.get('/', function(req, res, next) {

	try {
		res.render('players', {
			title: 'Academy Team',
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