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
const { getReservesTeamCupFixtures } = require('../../middleware/fixtures');

// Get the fixtures and the information for cups not yet drawn
app.use('/', parallelMiddlewares([getReservesTeamCupFixtures, preprocessStandings]));

// GET response for '/reserves-standings/premier-league-2'
app.use('/premier-league-2', [standings.getPL2Table, standings.processStandingsData]);
app.get('/premier-league-2', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Premier League 2 Standings',
			pl2Data: req.pl2Data,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/reserves-standings/premier-league-2-div-2'
app.use('/premier-league-2-div-2', [standings.getPL2Div2Table, standings.processStandingsData]);
app.get('/premier-league-2-div-2', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Premier League 2 Division II Standings',
			pl2Div2Data: req.pl2Div2Data,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/reserves-standings/pl-international-cup'
app.use('/pl-international-cup', [standings.getPLInternationalCupTable, standings.processStandingsData]);
app.get('/pl-international-cup', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Premier League International Cup Standings',
			plIntlCupData: req.plIntlCupData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/reserves-standings/youth-league'
app.use('/youth-league', [standings.getYouthLeagueTable, standings.processStandingsData]);
app.get('/youth-league', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'UEFA Youth League Standings',
			youthLeagueData: req.youthLeagueData,
			isSingleCompetition: true
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// GET response for '/reserves-standings'
app.use('/', parallelMiddlewares([standings.getPL2Table, standings.getPL2Div2Table, standings.getPLInternationalCupTable, standings.getYouthLeagueTable]));
app.use('/', standings.processStandingsData);
app.get('/', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Standings - Reserves Team',
			pl2Data: req.pl2Data,
			pl2Div2Data: req.pl2Div2Data,
			plIntlCupData: req.plIntlCupData,
			youthLeagueData: req.youthLeagueData,
			isSingleCompetition: false
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;