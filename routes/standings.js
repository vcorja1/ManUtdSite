// Require router dependencies
var express = require('express');
var app = express();

// Connect and use the middleware
const standings = require('../middleware/standings');
app.use('/', standings.getEPLTable);

// GET response for '/standings'
app.get('/', function(req, res, next) {

	try {
		res.render('standings', {
			title: 'Standings',
			epl: req.epl
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;