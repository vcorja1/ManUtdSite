// Require router dependencies
const express = require('express');
const app = express();

// GET response for '/kits'
app.get('/', function(req, res, next) {

	try {
		res.render('trophy_room', {
			title: 'Trophy Room'
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;