// Require router dependencies
var express = require('express');
var app = express();
// Connect to Heroku database
const { Client } = require('pg');

module.exports = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query('SELECT * FROM STAFF;', (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Save relevant Data
		req.staffData = resp.rows;
		
		// End connection
		client.end();

		// Continue
		next();
	});
};