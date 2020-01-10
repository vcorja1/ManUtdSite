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
const { getFirstTeamCupFixtures } = require('../../middleware/fixtures');

// Get the fixtures and the information for cups not yet drawn
app.use('/', parallelMiddlewares([getFirstTeamCupFixtures, preprocessStandings]));

// GET response for '/standings/premier-league'
app.use('/premier-league', [standings.getEPLTable, standings.processStandingsData]);
app.get('/premier-league', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Premier League Standings',
			MATCH_STATUS: req.MATCH_STATUS,
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
			MATCH_STATUS: req.MATCH_STATUS,
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
			MATCH_STATUS: req.MATCH_STATUS,
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
			MATCH_STATUS: req.MATCH_STATUS,
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
			MATCH_STATUS: req.MATCH_STATUS,
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
			MATCH_STATUS: req.MATCH_STATUS,
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
			MATCH_STATUS: req.MATCH_STATUS,
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
			MATCH_STATUS: req.MATCH_STATUS,
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
			MATCH_STATUS: req.MATCH_STATUS,
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
app.use('/', parallelMiddlewares([standings.getEPLTable, standings.getUCLTable, standings.getEuropaLeagueTable, standings.getICCTable]));
app.use('/', standings.processStandingsData);
app.get('/', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Standings - First Team',
			MATCH_STATUS: req.MATCH_STATUS,
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