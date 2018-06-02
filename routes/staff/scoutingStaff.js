// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const staff = require('../../middleware/staff');
app.use('/', staff.getScoutingTeam);

// GET response for '/scouting-team'
app.get('/', function(req, res, next) {

	try {
		res.render('staff/scoutingStaff', {
			title: 'Scouting Team',
			scoutData: req.scoutData
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;