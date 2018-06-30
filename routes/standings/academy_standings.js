// Require router dependencies
var express = require('express');
var app = express();

// Require the standings middleware
const standings = require('../../middleware/standings');

// Also require the fixtures middleware
const fixtures = require('../../middleware/fixtures');
// Get the fixtures and the information for cups not yet drawn
app.use('/', [fixtures.getAcademyTeamFixtures, standings.processCupsNotDrawn]);

// GET response for '/academy-standings/premier-league-north'
app.use('/premier-league-north', [standings.getU18PLTable, standings.processStandingsData]);
app.get('/premier-league-north', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'U18 Premier League North Standings',
			plNorthData: req.plNorthData,
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
			faYouthCupData: req.faYouthCupData,
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
			dallasCupData: req.dallasCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/academy-standings'
app.use('/', [standings.getU18PLTable, standings.getU18PLCupTable, standings.processStandingsData]);
app.get('/', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Academy Standings',
			plNorthData: req.plNorthData,
			plCupData: req.plCupData,
			faYouthCupData: req.faYouthCupData,
			ottenCupData: req.ottenCupData,
			vghCupData: req.vghCupData,
			dallasCupData: req.dallasCupData,
			isSingleCompetition: false
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;