// Require router dependencies
const express = require('express');
const app = express();

// Connect and use other routes
/* ----  NEWS  ---- */
const news = require('./news');
app.use('/news', news);

/* ----  FIXTURES  ---- */
const fixtures = require('./fixtures/fixtures');
app.use('/fixtures', fixtures);
const reserves_fixtures = require('./fixtures/reserves_fixtures');
app.use('/reserves-fixtures', reserves_fixtures);
const academy_fixtures = require('./fixtures/academy_fixtures');
app.use('/academy-fixtures', academy_fixtures);
const women_fixtures = require('./fixtures/women_fixtures');
app.use('/women-fixtures', women_fixtures);

/* ----  STANDINGS  ---- */
const standings = require('./standings/standings');
app.use('/standings', standings);
const reserves_standings = require('./standings/reserves_standings');
app.use('/reserves-standings', reserves_standings);
const academy_standings = require('./standings/academy_standings');
app.use('/academy-standings', academy_standings);
const women_standings = require('./standings/women_standings');
app.use('/women-standings', women_standings);

/* ----  PLAYERS  ---- */
const players = require('./players/first_team');
app.use('/first-team', players);
const reserves_team = require('./players/reserves_team');
app.use('/reserves-team', reserves_team);
const academy_team = require('./players/academy_team');
app.use('/academy-team', academy_team);
const women_team = require('./players/women_team');
app.use('/women-team', women_team);

/* ----  STAFF  ---- */
const coachingStaff = require('./staff/coachingStaff');
app.use('/staff', coachingStaff);
const boardStaff = require('./staff/boardStaff');
app.use('/board-members', boardStaff);
const medicalStaff = require('./staff/medicalStaff');
app.use('/medical-team', medicalStaff);
const scoutingStaff = require('./staff/scoutingStaff');
app.use('/scouting-team', scoutingStaff);
const clubStaff = require('./staff/clubStaff');
app.use('/club-staff', clubStaff);

/* ----  TROPY ROOM  ---- */
const trophy_room = require('./trophy_room');
app.use('/trophy-room', trophy_room);

/* ----  KITS  ---- */
const kits = require('./kits');
app.use('/kits', kits);


// GET response for '/'
app.get('/', function(req, res, next) {

	try {
		res.render('index', {
			title: 'Home Page'
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

// The 404 route
app.get('*', function(req, res, next) {

	try {
		res.render('error', {
			title: 'Page Not Found - Manchester United Fan Website'
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;