// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const { getAcademyTeamPlayerInfo } = require('../../middleware/players');
app.use('/:player_id', getAcademyTeamPlayerInfo);

// GET response for '/first-team/:player_id'
app.get('/:player_id', function(req, res, next) {

	try {
		const title = req.player != null ? (req.player.name + ' | Player Profile') : 'No Player Information Available';
		res.render('playerInfo', {
			title: title,
			player: req.player,
			teamPageUrl: req.originalUrl.toString().replace(/[^/]*$/, '')
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});


// Connect and use the middleware
const { getAcademyTeamPlayers } = require('../../middleware/players');
app.use('/', getAcademyTeamPlayers);

// GET response for '/academy-team'
app.get('/', function(req, res, next) {

	try {
		res.render('players', {
			title: 'Academy Team Players',
			goalkeepers: req.goalkeepers,
			defenders: req.defenders,
			midfielders: req.midfielders,
			strikers: req.strikers,
			loanedOut: req.loanedOut,
			shouldDisplayJerseyNumber: false,
			currentUrl: req.originalUrl.toString() + '/'
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;