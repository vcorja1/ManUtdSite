// Require router dependencies
const express = require('express');
const app = express();

// Connect and use the middleware
const staff = require('../../middleware/staff');
app.use('/', staff.getBoardMembers);

// GET response for '/board-members'
app.get('/', function(req, res, next) {

	try {
		res.render('staff/boardStaff', {
			title: 'Board Members',
			boardData: req.boardData
		});
	}
	catch (e) {
		// If there are any errors, send them off the the logger
		next(e);
	}

});

module.exports = app;