// Connect to Heroku database
const { Client } = require('pg');

// Get helper functions
const { getFullCountryName } = require('../helpers/staff');
const { getClubData } = require('../helpers/clubs');
const { getCompetitionName, getTeamByCompetitionID } = require('../helpers/competitions');
const { TEAMS } = require('../helpers/teams');
const { processPlayerInfo } = require('../middleware/players');

// Country flag images location
const ICON_IMG_FOLDER = 'img/icons/';


// Process Cups That Aren't Played In This Season, Or That Haven't Been Drawn Yet
exports.processNews = (req, res, next) => {
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
	client.query(`SELECT * FROM OTHER_INFO LEFT JOIN PLAYERS ON OTHER_INFO.info_value = PLAYERS.id;`, (err, resp) => {
		// Handle error
		if (err || !resp) {
			req.loadedData = false;
			res.status(400);
			return next();
		}

		// Save all information
		const otherInfo = JSON.parse(JSON.stringify(resp.rows));

		// Store departed players
		let departedPlayers = [];
		otherInfo.filter(row => row.info_name == 'DEPARTED_PLAYERS').forEach( (player) => {
			player.info_note = JSON.parse(player.info_note);
			getFullCountryName(player.info_note);
			let nextClubInfo = (player.info_note.nextClub != null) ? getClubData(player.info_note.nextClub) : null;

			// Insert player information
			departedPlayers.push({
				name: player.info_value,
				flagImg: player.info_note.flagImg,
				position: player.info_note.position,
				reason: player.info_note.reason,
				nextClub: nextClubInfo != null ? nextClubInfo.displayName : null,
				clubLogoSrc: nextClubInfo != null ? nextClubInfo.clubLogoSrc : null
			});
		});

		// Store World Cup news
		let worldCupTitle = 'World Cup';
		let worldCupParticipants = [];
		otherInfo.filter(row => row.info_name == 'WORLD_CUP_PARTICIPANTS').forEach( (player) => {
			processPlayerInfo(player);

			worldCupParticipants.push({
				id: player.id,
				name: player.name,
				countryName: player.countryName,
				flagImg: player.flagImg.substr(3)
			});

			if(player.team == 8) {
				worldCupTitle = 'Women\'s World Cup';
			}
		});
		worldCupParticipants.sort((a, b) => a.countryName.localeCompare(b.countryName));

		// Store last season's awards
		let awards = {
			seniorTeam: [],
			reservesTeam: [],
			academyTeam: [],
			womenTeam: []
		};
		otherInfo.filter(row => row.info_name == 'AWARDS').forEach( (award) => {
			const awardDetails = {
				competitionName: getCompetitionName(award.info_competition),
				awardDescription: award.info_note,
				awardIconImg: getAwardIcon(award.info_value),
				awardIconAlt: `${award.info_value} Icon`
			};

			switch(getTeamByCompetitionID(award.info_competition)) {
				case TEAMS.SENIOR:
					awards.seniorTeam.push(awardDetails);
					break;
				case TEAMS.RESERVES:
					awards.reservesTeam.push(awardDetails);
					break;
				case TEAMS.ACADEMY:
					awards.academyTeam.push(awardDetails);
					break;
				case TEAMS.WOMEN:
					awards.womenTeam.push(awardDetails);
					break;
			}
		});
		awards.seniorTeam = combineAwardsByCompetition(awards.seniorTeam);
		awards.reservesTeam = combineAwardsByCompetition(awards.reservesTeam);
		awards.academyTeam = combineAwardsByCompetition(awards.academyTeam);
		awards.womenTeam = combineAwardsByCompetition(awards.womenTeam);

		// Store other info
		req.otherInfo = {
			currentSeason: otherInfo.filter(row => row.info_name == 'CURRENT_YEAR')[0].info_value,
			lastSeason: otherInfo.filter(row => row.info_name == 'LAST_YEAR')[0].info_value,
			transferSigningDateStart: otherInfo.filter(row => row.info_name == 'CURRENT_YEAR_TRANSFER_START')[0].info_value,
			departedPlayers: departedPlayers,
			worldCupTitle: worldCupTitle,
			worldCupParticipants: worldCupParticipants,
			awards: awards
		};

		// End connection
		client.end();

		// Continue
		return next();
	});

};

exports.getCurrentSeason = (req, res, next) => {
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
	client.query(`SELECT * FROM OTHER_INFO WHERE OTHER_INFO.info_name = 'CURRENT_YEAR' LIMIT 1;`, (err, resp) => {
		// Handle error
		if (err || !resp) {
			req.loadedData = false;
			res.status(400);
			return next();
		}

		// Save all information
		const currentSeason = JSON.parse(JSON.stringify(resp.rows));
		req.currentSeason = currentSeason[0].info_value;

		// End connection
		client.end();

		// Continue
		return next();
	});

};


function getAwardIcon(iconType) {
	switch(iconType) {
		case 'Trophy':
			return `${ICON_IMG_FOLDER}trophyIcon.svg`;
		case 'Cup':
			return `${ICON_IMG_FOLDER}cupIcon.svg`;
		case 'Progress':
			return `${ICON_IMG_FOLDER}progressIcon.svg`;
		case 'Cross':
			return `${ICON_IMG_FOLDER}crossIcon.svg`;
		case 'Ball':
			return `${ICON_IMG_FOLDER}ballIcon.svg`;
		case 'Glove':
			return `${ICON_IMG_FOLDER}gloveIcon.svg`;
		default:
			return '';
	}
}

function combineAwardsByCompetition(awards) {
	if(awards == null || awards.length == 0) {
		return null;
	}

	return awards.reduce(function (result, award) {
		result[award.competitionName] = result[award.competitionName] || [];
		result[award.competitionName].push(award);
		return result;
	}, Object.create(null));
}
