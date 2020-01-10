// Require router dependencies
const express = require('express');
const app = express();

// Connect and use the middleware
const staff = require('../../middleware/staff');
app.use('/', staff.getMedicalTeam);

// GET response for '/medical-team'
app.get('/', function(req, res, next) {

	try {
		res.render('staff/medicalStaff', {
			title: 'Medical Team',
			medicalData: req.medicalData
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;