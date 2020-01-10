// Require router dependencies
const express = require('express');
const app = express();

// Connect and use the middleware
const staff = require('../../middleware/staff');
app.use('/', staff.getCoachingStaff);

// GET response for '/staff'
app.get('/', function(req, res, next) {

	try {
		res.render('staff/coachingStaff', {
			title: 'Coaching Staff',
			staffData: req.staffData,
			academyData: req.academyData,
			womenData: req.womenData
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;