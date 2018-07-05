// Connect to Heroku database
const { Client } = require('pg');

// Get helper functions
const { getPositionAbbr } = require('../helpers/players');
const { getFullCountryName } = require('../helpers/staff');

// Get fixtures for the given team
function getTeamPlayers(team, req, res, next) {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query(`SELECT * FROM PLAYERS WHERE team='${team}' ORDER BY position;`, (err, resp) => {
		// Handle error
		if (err || !resp) {
			req.loadedData = false;
			res.status(400);
			return next();
		}

		// Save all players
		req.players = JSON.parse(JSON.stringify(resp.rows));

		// Store based on position
		if(req.players != null && req.players != []) {
			req.goalkeepers = [];
			req.defenders = [];
			req.midfielders = [];
			req.strikers = [];

			req.players.forEach( (player) => {
				// Store position abbreviation
				player.positionAbbr = getPositionAbbr(player.position);
				// Store full country name and its flag image
				getFullCountryName(player);

				// Store to appropriate location
				if(player.position == 0) {
					req.goalkeepers.push(player);
				}
				else if(player.position <= 3) {
					req.defenders.push(player);
				}
				else if(player.position <= 6) {
					req.midfielders.push(player);
				}
				else {
					req.strikers.push(player);
				}
			});
		}

		// End connection
		client.end();

		// Continue
		return next();
	});
};

// Get fixtures for the reserves team
exports.getFirstTeamPlayers = (req, res, next) => {
	return getTeamPlayers(0, req, res, next);
}

// Get fixtures for the reserves team
exports.getReservesTeamPlayers = (req, res, next) => {
	return getTeamPlayers(1, req, res, next);
};

// Get fixtures for the reserves team
exports.getAcademyTeamPlayers = (req, res, next) => {
	return getTeamPlayers(2, req, res, next);
};
