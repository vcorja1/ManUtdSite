// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const staff = require('../middleware/staff');
app.use('/', staff);

// GET response for '/staff'
app.get('/', function(req, res, next) {

	try {
		res.render('staff', {
			title: 'Staff',
			staffData: req.staffData
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;