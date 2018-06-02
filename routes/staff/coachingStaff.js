// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const staff = require('../../middleware/staff');
app.use('/', staff.getCoachingStaff);

// GET response for '/staff'
app.get('/', function(req, res, next) {

	try {
		res.render('staff/coachingStaff', {
			title: 'Coaching Staff',
			staffData: req.staffData,
			academyData: req.academyData
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;