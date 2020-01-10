// Require router dependencies
const express = require('express');
const app = express();

// Run middleware in parallel where possible
const { parallelMiddlewares } = require('../helpers/parallelMiddlewares');

// Require the player information preprocessing middleware
const { processNews } = require('../middleware/news');
// Require the player information preprocessing middleware
const { getRecentlySignedAndLoanedOutNewsInfo } = require('../middleware/players');

// GET response for '/news'
app.use('/', processNews);
app.use('/', parallelMiddlewares([getRecentlySignedAndLoanedOutNewsInfo]));
app.get('/', function(req, res, next) {

	try {
		res.render('news', {
			title: 'Latest News and Season Overview',
			currentSeason: req.otherInfo.currentSeason,
			lastSeason: req.otherInfo.lastSeason,
			transferSigningDateStart: req.otherInfo.transferSigningDateStart,
			departedPlayers: req.otherInfo.departedPlayers,
			loanedOut: req.loanedOut,
			recentlySigned: req.recentlySigned,
			recentlySignedToAcademy: req.recentlySignedToAcademy,
			worldCupTitle: req.otherInfo.worldCupTitle,
			worldCupParticipants: req.otherInfo.worldCupParticipants,
			awards: req.otherInfo.awards
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;