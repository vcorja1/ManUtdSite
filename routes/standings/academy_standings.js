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
const { getAcademyTeamCupFixtures } = require('../../middleware/fixtures');

// Get the fixtures and the information for cups not yet drawn
app.use('/', parallelMiddlewares([getAcademyTeamCupFixtures, preprocessStandings]));

// GET response for '/academy-standings/premier-league-north'
app.use('/premier-league-north', [standings.getU18PLTable, standings.processStandingsData]);
app.get('/premier-league-north', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'U18 Premier League North Standings',
			MATCH_STATUS: req.MATCH_STATUS,
			u18PlNorthData: req.u18PlNorthData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/academy-standings/premier-league-cup'
app.use('/premier-league-cup', [standings.getU18PLCupTable, standings.processStandingsData]);
app.get('/premier-league-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'U18 Premier League Cup Standings',
			MATCH_STATUS: req.MATCH_STATUS,
			plCupData: req.plCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/academy-standings/fa-youth-cup'
app.use('/fa-youth-cup', standings.processStandingsData);
app.get('/fa-youth-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'FA Youth Cup Standings',
			MATCH_STATUS: req.MATCH_STATUS,
			faYouthCupData: req.faYouthCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/academy-standings/ruhr-cup'
app.use('/ruhr-cup', standings.processStandingsData);
app.get('/ruhr-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Ruhr Cup Standings',
			MATCH_STATUS: req.MATCH_STATUS,
			ruhrCupData: req.ruhrCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/academy-standings/otten-cup'
app.use('/otten-cup', standings.processStandingsData);
app.get('/otten-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Otten Cup Standings',
			MATCH_STATUS: req.MATCH_STATUS,
			ottenCupData: req.ottenCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/academy-standings/vgh-cup'
app.use('/vgh-cup', standings.processStandingsData);
app.get('/vgh-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Sparkasse & VGH Cup Standings',
			MATCH_STATUS: req.MATCH_STATUS,
			vghCupData: req.vghCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/academy-standings/dallas-cup'
app.use('/dallas-cup', standings.processStandingsData);
app.get('/dallas-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Dallas Cup Standings',
			MATCH_STATUS: req.MATCH_STATUS,
			dallasCupData: req.dallasCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/academy-standings/icgt-tournament'
app.use('/icgt-tournament', standings.processStandingsData);
app.get('/icgt-tournament', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'ICGT Tournament Standings',
			MATCH_STATUS: req.MATCH_STATUS,
			icgtTournamentData: req.icgtTournamentData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/academy-standings'
app.use('/', parallelMiddlewares([standings.getU18PLTable, standings.getU18PLCupTable]));
app.use('/', standings.processStandingsData);
app.get('/', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Academy Standings',
			MATCH_STATUS: req.MATCH_STATUS,
			u18PlNorthData: req.u18PlNorthData,
			plCupData: req.plCupData,
			faYouthCupData: req.faYouthCupData,
			ruhrCupData: req.ruhrCupData,
			ottenCupData: req.ottenCupData,
			vghCupData: req.vghCupData,
			dallasCupData: req.dallasCupData,
			icgtTournamentData: req.icgtTournamentData,
			isSingleCompetition: false
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;