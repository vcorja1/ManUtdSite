// Connect to Heroku database
const { Client } = require('pg');

// Get helper functions
const { TEAMS } = require('../helpers/teams');
const { getFullCountryName } = require('../helpers/staff');

// Store positions abbreviations
const POSITIONS = [
	'GK', 'CB', 'RB', 'LB', 'DM', 'CM', 'AM', 'RW', 'LW', 'ST'
];
Object.freeze(POSITIONS);



// Get fixtures for the reserves team
exports.getFirstTeamPlayers = (req, res, next) => {
	return getTeamPlayers(TEAMS.SENIOR, req, res, next);
}

// Get fixtures for the reserves team
exports.getReservesTeamPlayers = (req, res, next) => {
	return getTeamPlayers(TEAMS.RESERVES, req, res, next);
};

// Get fixtures for the academy team
exports.getAcademyTeamPlayers = (req, res, next) => {
	return getTeamPlayers(TEAMS.ACADEMY, req, res, next);
};

// Get fixtures for the women's team
exports.getWomenTeamPlayers = (req, res, next) => {
	return getTeamPlayers(TEAMS.WOMEN, req, res, next);
};



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
				player.positionAbbr = POSITIONS[player.position];
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
