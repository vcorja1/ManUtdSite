// Connect to Heroku database
const { Client } = require('pg');

// Get helper functions
const { getClubData } = require('../helpers/clubs');
const { TEAMS, getInternationalTeamName } = require('../helpers/teams');
const { getFullCountryName } = require('../helpers/staff');

// Store positions
const POSITIONS = {
	GOALKEEPER: 0,
	CENTER_BACK: 1,
	RIGHT_BACK: 2,
	LEFT_BACK: 3,
	DEFENSIVE_MID: 4,
	CENTER_MID: 5,
	ATTACKING_MID: 6,
	RIGHT_WINGER: 7,
	LEFT_WINGER: 8,
	STRIKER: 9
};
Object.freeze(POSITIONS);

// Store positions abbreviations
const POSITION_ABBR = [
	'GK', 'CB', 'RB', 'LB', 'DM', 'CM', 'AM', 'RW', 'LW', 'ST'
];
Object.freeze(POSITION_ABBR);

// Store positions names
const POSITION_NAMES = [
	'Goalkeeper',
	'Center Back',
	'Right Back',
	'Left Back',
	'Defensive Midfielder',
	'Center Midfielder',
	'Attacking Midfielder',
	'Right Winger',
	'Left Winger',
	'Striker'
];
Object.freeze(POSITION_NAMES);



// Get all first team players
exports.getFirstTeamPlayers = (req, res, next) => {
	return getTeamPlayers(TEAMS.SENIOR, req, res, next);
};

// Get all reserves team players
exports.getReservesTeamPlayers = (req, res, next) => {
	return getTeamPlayers(TEAMS.RESERVES, req, res, next);
};

// Get all academy team players
exports.getAcademyTeamPlayers = (req, res, next) => {
	return getTeamPlayers(TEAMS.ACADEMY, req, res, next);
};

// Get all women's team players
exports.getWomenTeamPlayers = (req, res, next) => {
	return getTeamPlayers(TEAMS.WOMEN, req, res, next);
};



// Get a particular first team player
exports.getFirstTeamPlayerInfo = (req, res, next) => {
	return getPlayerInfo(TEAMS.SENIOR, req, res, next);
};

// Get a particular reserves team player
exports.getReservesTeamPlayerInfo = (req, res, next) => {
	return getPlayerInfo(TEAMS.RESERVES, req, res, next);
};

// Get a particular academy team player
exports.getAcademyTeamPlayerInfo = (req, res, next) => {
	return getPlayerInfo(TEAMS.ACADEMY, req, res, next);
};

// Get a particular women's team player
exports.getWomenTeamPlayerInfo = (req, res, next) => {
	return getPlayerInfo(TEAMS.WOMEN, req, res, next);
};

// Get recently signed and loaned out players
exports.getRecentlySignedAndLoanedOutNewsInfo = (req, res, next) => {
	return getRecentlySignedAndLoanedOutNewsInfo(req, res, next);
};




// Get all players for the given team
function getTeamPlayers(team, req, res, next) {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		},
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query(`SELECT * FROM PLAYERS WHERE team=($1) ORDER BY position;`, [team], (err, resp) => {
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
			req.loanedOut = [];
			req.goalkeepers = [];
			req.defenders = [];
			req.midfielders = [];
			req.strikers = [];

			req.players.forEach( (player) => {
				// Process and store available player data
				processPlayerInfo(player);

				// Store to appropriate location
				if(player.loanedto != null && player.loanedto != '') {
					req.loanedOut.push(player);
				}
				else if(player.position == POSITIONS.GOALKEEPER) {
					req.goalkeepers.push(player);
				}
				else if(player.position <= POSITIONS.LEFT_BACK) {
					req.defenders.push(player);
				}
				else if(player.position <= POSITIONS.ATTACKING_MID) {
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
}


// Get the player's information
function getPlayerInfo(team, req, res, next) {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		},
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query(`SELECT * FROM PLAYERS WHERE team=($1) and id=($2);`, [team, req.params.player_id], (err, resp) => {
		// Handle error
		if (err || !resp) {
			req.loadedData = false;
			res.status(400);
			return next();
		}

		// Get player data
		let player = JSON.parse(JSON.stringify(resp.rows));
		player = player[0];

		// Store player data
		if(player != null) {
			// Process and store available player data
			processPlayerInfo(player);

			// Store each position's proficiency level
			const naturalPositions = player.naturalpositions != null ? JSON.parse(player.naturalpositions) : [];
			const competentPositions = player.competentpositions != null ? JSON.parse(player.competentpositions) : [];

			player.positions = {
				gk: getPositionKnowledge(POSITIONS.GOALKEEPER, player.position, naturalPositions, competentPositions),
				cb: getPositionKnowledge(POSITIONS.CENTER_BACK, player.position, naturalPositions, competentPositions),
				rb: getPositionKnowledge(POSITIONS.RIGHT_BACK, player.position, naturalPositions, competentPositions),
				lb: getPositionKnowledge(POSITIONS.LEFT_BACK, player.position, naturalPositions, competentPositions),
				dm: getPositionKnowledge(POSITIONS.DEFENSIVE_MID, player.position, naturalPositions, competentPositions),
				cm: getPositionKnowledge(POSITIONS.CENTER_MID, player.position, naturalPositions, competentPositions),
				am: getPositionKnowledge(POSITIONS.ATTACKING_MID, player.position, naturalPositions, competentPositions),
				rw: getPositionKnowledge(POSITIONS.RIGHT_WINGER, player.position, naturalPositions, competentPositions),
				lw: getPositionKnowledge(POSITIONS.LEFT_WINGER, player.position, naturalPositions, competentPositions),
				st: getPositionKnowledge(POSITIONS.STRIKER, player.position, naturalPositions, competentPositions)
			};
		}

		// Save player
		req.player = player;

		// End connection
		client.end();

		// Continue
		return next();
	});
}

// Get position knowledge
// True => Natural; False => Competent; Null => Unable to play
function getPositionKnowledge(position, main, natural, competent) {
	if(position === main || natural.includes(position)) {
		return true;
	}
	if(competent.includes(position)) {
		return false;
	}
	return null;
}


// Get recently signed and loaned out players
function getRecentlySignedAndLoanedOutNewsInfo(req, res, next) {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		},
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query(`SELECT * FROM PLAYERS WHERE datejoined >= ($1) OR loanedto IS NOT NULL OR loanedfrom IS NOT NULL ORDER BY team;`, [req.otherInfo.transferSigningDateStart], (err, resp) => {
		// Handle error
		if (err || !resp) {
			console.log(err);
			req.loadedData = false;
			res.status(400);
			return next();
		}

		// Save all players
		const players = JSON.parse(JSON.stringify(resp.rows));
		req.loanedOut = [];
		req.recentlySigned = [];
		req.recentlySignedToAcademy = [];

		// Store based on status
		if(players != null) {
			players.forEach( (player) => {
				// Process and store available player data
				processPlayerInfo(player);

				if(player.loanedto != null && player.loanedto != '') {
					// Get data for players loaned out
					const nextClubData = getClubData(player.loanedto, TEAMS.SENIOR, -1);
					let playerInfo = {
						id: player.id,
						name: player.name,
						team: player.team,
						position: player.positionAbbr,
						countryName: player.countryName,
						flagImg: player.flagImg.substr(3),
						nextClub: nextClubData.displayName,
						clubLogoSrc: nextClubData.clubLogoSrc
					};
					req.loanedOut.push(playerInfo);
				}

				if(player.loanedfrom != null || player.previousclub != null) {
					// Get data for newly acquired players
					const previousClubData = getClubData(player.loanedfrom || player.previousclub, TEAMS.SENIOR, -1);
					let playerInfo = {
						id: player.id,
						name: player.name,
						team: player.team,
						position: player.positionAbbr,
						countryName: player.countryName,
						flagImg: player.flagImg.substr(3),
						prevClub: previousClubData.displayName,
						clubLogoSrc: previousClubData.clubLogoSrc
					};

					// Store to appropriate location
					if(player.datejoined >= req.otherInfo.transferSigningDateStart || player.loanedfrom) {
						if(player.team == TEAMS.ACADEMY) {
							/*if(player.previousclub != 'Manchester United') {
								req.recentlySignedToAcademy.push(playerInfo);
							}*/
							req.recentlySignedToAcademy.push(playerInfo);
						}
						else {
							if(player.loanedfrom) {
								playerInfo.prevClub = playerInfo.prevClub + " (Loan)";
							}
							req.recentlySigned.push(playerInfo);
						}
					}
				}
			});
		}

		// End connection
		client.end();

		// Continue
		return next();
	});
}


// Process Player Data And Add Required Information
exports.processPlayerInfo = (player) => { return processPlayerInfo(player); };

function processPlayerInfo(player) {
	// Format player date of birth
	if(player.dob != null && player.dob != '') {
		let dob = new Date(player.dob);
		player.dob = dob.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
		player.age = ~~((Date.now() - dob) / (24 * 3600 * 365.25 * 1000));
	}

	// Store full country name and its flag image
	getFullCountryName(player);
	player.flagImg = '../' + player.flagImg;

	// Store international level experience
	player.internationalLevel = getInternationalTeamName(player.cappedlevel);

	// Store position data
	player.positionAbbr = POSITION_ABBR[player.position];
	player.positionName = POSITION_NAMES[player.position];

	// Format player's contract expiration date
	if(player.contractexpires != null && player.contractexpires != '') {
		let contractexpires = new Date(player.contractexpires + '-06-30');
		player.contractexpires = contractexpires.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
	}

	// Get loan club information (if applicable)
	if(player.loanedto != null && player.loanedto != '') {
		player.clubLoanedTo = getClubData(player.loanedto, TEAMS.SENIOR, -1);
	}
	if(player.loanedfrom != null && player.loanedfrom != '') {
		player.clubLoanedFrom = getClubData(player.loanedfrom, TEAMS.SENIOR, -1);
	}
}
