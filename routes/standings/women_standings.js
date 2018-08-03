// Require router dependencies
var express = require('express');
var app = express();

// Run middleware in parallel where possible
const { parallelMiddlewares } = require('../../helpers/parallelMiddlewares');

// Require the standings preprocessing middleware
const { preprocessStandings } = require('../../middleware/preprocessStandings');
// Also require the standings middleware
const standings = require('../../middleware/standings');
// Also require the fixtures middleware
const { getWomenTeamCupFixtures } = require('../../middleware/fixtures');

// Get the fixtures and the information for cups not yet drawn
app.use('/', parallelMiddlewares([getWomenTeamCupFixtures, preprocessStandings]));

// GET response for '/women-standings/fa-women-championship'
app.use('/fa-women-championship', [standings.getFAWomenChampionshipTable, standings.processStandingsData]);
app.get('/fa-women-championship', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'FA Women\'s Championship Standings',
			faWomenChampionshipData: req.faWomenChampionshipData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/women-standings/fa-wsl-cup'
app.use('/fa-wsl-cup', [standings.getFAWSLCupTable, standings.processStandingsData]);
app.get('/fa-wsl-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'FA WSL Continental Tyres Cup Results',
			faWSLCupData: req.faWSLCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/women-standings'
app.use('/', parallelMiddlewares([standings.getFAWomenChampionshipTable, standings.getFAWSLCupTable]));
app.use('/', standings.processStandingsData);
app.get('/', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Standings - Women\'s Team',
			faWomenChampionshipData: req.faWomenChampionshipData,
			faWSLCupData: req.faWSLCupData,
			isSingleCompetition: false
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;