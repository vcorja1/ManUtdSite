// Require router dependencies
var express = require('express');
var app = express();

// GET response for '/kits'
app.get('/', function(req, res, next) {

	try {
		res.render('kits', {
			title: '2019/20 Kits'
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;