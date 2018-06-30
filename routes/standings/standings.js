// Require router dependencies
var express = require('express');
var app = express();

// Require the standings middleware
const standings = require('../../middleware/standings');

// Also require the fixtures middleware
const fixtures = require('../../middleware/fixtures');
// Get the fixtures and the information for cups not yet drawn
app.use('/', [fixtures.getFirstTeamFixtures, fixtures.getLiveScore, standings.processCupsNotDrawn]);

// GET response for '/standings/premier-league'
app.use('/premier-league', [standings.getEPLTable, standings.processStandingsData]);
app.get('/premier-league', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Premier League Standings',
			eplData: req.eplData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings/fa-cup'
app.use('/fa-cup', standings.processStandingsData);
app.get('/fa-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'FA Cup Results',
			faCupData: req.faCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings/carabao-cup'
app.use('/carabao-cup', standings.processStandingsData);
app.get('/carabao-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Carabao Cup Results',
			carabaoCupData: req.carabaoCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings/community-shield'
app.use('/community-shield', standings.processStandingsData);
app.get('/community-shield', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Community Shield Results',
			communityShieldData: req.communityShieldData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings/champions-league'
app.use('/champions-league', [standings.getUCLTable, standings.processStandingsData]);
app.get('/champions-league', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Champions League Standings',
			uclData: req.uclData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings/europa-league'
app.use('/europa-league', [standings.getEuropaLeagueTable, standings.processStandingsData]);
app.get('/europa-league', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Europa League Standings',
			europaLeagueData: req.europaLeagueData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings/super-cup'
app.use('/super-cup', standings.processStandingsData);
app.get('/super-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Super Cup Results',
			superCupData: req.superCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings/club-world-cup'
app.use('/club-world-cup', standings.processStandingsData);
app.get('/club-world-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'FIFA Club World Cup Results',
			clubWorldCupData: req.clubWorldCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings/international-champions-cup'
app.use('/international-champions-cup', [standings.getICCTable, standings.processStandingsData]);
app.get('/international-champions-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'International Champions Cup Standings',
			iccData: req.iccData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/standings'
app.use('/', [standings.getEPLTable, standings.getUCLTable, standings.getEuropaLeagueTable, standings.getICCTable, standings.processStandingsData]);
app.get('/', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Standings - First Team',
			eplData: req.eplData,
			faCupData: req.faCupData,
			carabaoCupData: req.carabaoCupData,
			communityShieldData: req.communityShieldData,
			uclData: req.uclData,
			europaLeagueData: req.europaLeagueData,
			superCupData: req.superCupData,
			clubWorldCupData: req.clubWorldCupData,
			iccData: req.iccData,
			isSingleCompetition: false
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;