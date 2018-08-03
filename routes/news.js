// Require router dependencies
var express = require('express');
var app = express();

// Get Helper Data
const {
	incomingPlayers,
	academySignings,
	departingPlayers,
	loanedPlayers,
	worldCupParticipants
} = require('../middleware/playerTransfers');

// Country flag images location
const ICON_IMG_FOLDER = 'img/icons/';


// GET response for '/news'
app.get('/', function(req, res, next) {

	try {
		res.render('news', {
			title: 'Latest News and Season Overview',
			icons: {
				trophyIcon: ICON_IMG_FOLDER + 'trophyIcon.svg',
				cupIcon: ICON_IMG_FOLDER + 'cupIcon.svg',
				progressIcon: ICON_IMG_FOLDER + 'progressIcon.svg',
				crossIcon: ICON_IMG_FOLDER + 'crossIcon.svg',
				ballIcon: ICON_IMG_FOLDER + 'ballIcon.svg',
				gloveIcon: ICON_IMG_FOLDER + 'gloveIcon.svg'
			},
			incomingPlayers: incomingPlayers,
			academySignings: academySignings,
			loanedPlayers: loanedPlayers,
			departingPlayers: departingPlayers,
			worldCupParticipants: worldCupParticipants
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;