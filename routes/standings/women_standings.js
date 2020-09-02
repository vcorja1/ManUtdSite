// Require router dependencies
const express = require('express');
const app = express();

// Run middleware in parallel where possible
const { parallelMiddlewares } = require('../../helpers/parallelMiddlewares');

// Require the standings preprocessing middleware
const { preprocessStandings } = require('../../middleware/preprocessStandings');
// Also require the standings middleware
const standings = require('../../middleware/standings');
// Also require the fixtures middleware
const { getWomenTeamCupFixtures } = require('../../middleware/fixtures');
// Require middleware to get the current season
const { getCurrentSeason } = require('../../middleware/news');

// Get the fixtures and the information for cups not yet drawn
app.use('/', parallelMiddlewares([getWomenTeamCupFixtures, preprocessStandings, getCurrentSeason]));

// GET response for '/women-standings/fa-women-super-league'
app.use('/fa-women-super-league', [standings.getFAWomenSuperLeagueTable, standings.processStandingsData]);
app.get('/fa-women-super-league', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'FA Women\'s Super League Standings',
			currentSeason: req.currentSeason,
			MATCH_STATUS: req.MATCH_STATUS,
			faWomenSuperLeagueData: req.faWomenSuperLeagueData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/women-standings/fa-women-championship'
app.use('/fa-women-championship', [standings.getFAWomenChampionshipTable, standings.processStandingsData]);
app.get('/fa-women-championship', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'FA Women\'s Championship Standings',
			currentSeason: req.currentSeason,
			MATCH_STATUS: req.MATCH_STATUS,
			faWomenChampionshipData: req.faWomenChampionshipData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/women-standings/women-fa-cup'
app.use('/women-fa-cup', standings.processStandingsData);
app.get('/women-fa-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Women\'s FA Cup Results',
			currentSeason: req.currentSeason,
			MATCH_STATUS: req.MATCH_STATUS,
			womenFaCupData: req.womenFaCupData,
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
			currentSeason: req.currentSeason,
			MATCH_STATUS: req.MATCH_STATUS,
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
app.use('/', parallelMiddlewares([standings.getFAWomenSuperLeagueTable, standings.getFAWomenChampionshipTable, standings.getFAWSLCupTable]));
app.use('/', standings.processStandingsData);
app.get('/', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Standings - Women\'s Team',
			currentSeason: req.currentSeason,
			MATCH_STATUS: req.MATCH_STATUS,
			faWomenSuperLeagueData: req.faWomenSuperLeagueData,
			faWomenChampionshipData: req.faWomenChampionshipData,
			womenFaCupData: req.womenFaCupData,
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