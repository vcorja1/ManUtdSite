// Require router dependencies
const express = require('express');
const app = express();

// Require the current season via middleware
const { getCurrentSeason } = require('../middleware/news');

// GET response for '/kits'
app.use('/', getCurrentSeason);
app.get('/', function(req, res, next) {

	try {
		res.render('kits', {
			title: `${req.currentSeason} Kits`,
			currentSeason: req.currentSeason,
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;