const http = require('http');
// Connect to Heroku database
const { Client } = require('pg');
// Get Fixture Status
const fixtureHelper = require('../helpers/fixtures.js');

const eplTableURL = 'http://api.football-data.org/v1/competitions/445/leagueTable/?matchday=38';
const CURRENT_SEASON = '2017/18';
const STANDINGS_LOCATION = '/standings/';

// Get the Premier League Standings
exports.getEPLTable = (req, res, next) => {
	http.get(eplTableURL, (resp) => {
		const { statusCode } = resp;
		const contentType = resp.headers['content-type'];

		if (statusCode !== 200 || !/^application\/json/.test(contentType)) {
			// Consume response data to free up memory
			resp.resume();

			// Handle error here
			return next();
		}

		resp.setEncoding('utf8');
		let rawData = '';
		resp.on('data', (chunk) => { rawData += chunk; });
		resp.on('end', () => {
			try {
				// Get the EPL Table Standings
				const parsedData = JSON.parse(rawData);
				req.eplTable = parsedData.standing;
				req.eplTable.forEach(function(team) {
					// Store Long Name
					team.teamNameLong = fixtureHelper.getTeamLong(0, 0, team.teamName);

					// Store Appropriate Color Based On The Table Position
					if(team.position < 4) {
						team.color = 'rgba(51, 218, 255, 0.5)';
					}
					else if(team.position == 4) {
						team.color = 'rgba(187, 243, 255, 0.5)';
					}
					if(team.position == 5) {
						team.color = 'rgba(187, 243, 187, 0.5)';
					}
					else if(team.position > 17) {
						team.color = 'rgba(255, 187, 187, 0.5)';
					}
				});
				// Continue
				return next();
			} catch (e) {
				// Handle error here
				return next(e);
			}
		});
	}).on('error', (e) => {
		// Handle error here
		return next(e);
	});
};

// Get the Champions League standings
exports.getUCLTable = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query("SELECT * FROM STANDINGS WHERE id='ucl';", (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Save relevant Data
		req.uclTable = resp.rows[0];
		req.uclTable = JSON.parse(req.uclTable.data);
		req.uclTable = req.uclTable.standing;
		req.uclTable.forEach(function(team) {
			// Store Long Name
			team.teamNameLong = fixtureHelper.getTeamLong(0, 1, team.teamName);

			// Store Appropriate Color Based On The Table Position
			if(team.position < 3) {
				team.color = 'rgba(36, 255, 63, 0.5)';
			}
			else if(team.position == 3) {
				team.color = 'rgba(187, 243, 255, 0.5)';
			}
		});

		// End connection
		client.end();

		// Continue
		return next();
	});
};

// Get the Premier League 2 Standings
exports.getPL2Table = (req, res, next) => {
	// TO-DO !!!
	req.pl2 = [];
	return next();
};

// Get the PL International Cup Standings
exports.getPLInternationalCupTable = (req, res, next) => {
	// TO-DO !!!
	req.pl_int_cup = [];
	return next();
};

// Get the Under-19 UEFA Youth League Standings
exports.getYouthLeagueTable = (req, res, next) => {
	// TO-DO !!!
	req.youth_league = [];
	return next();
};

// Get the U18 Premier League North Standings
exports.getU18PLTable = (req, res, next) => {
	// TO-DO !!!
	req.u18_pl = [];
	return next();
};

// Get the U18 Premier League Cup Standings
exports.getU18PLCupTable = (req, res, next) => {
	// TO-DO !!!
	req.u18_pl_cup = [];
	return next();
};

// Process Standings Data for First Team
exports.processStandingsData = (req, res, next) => {
	if(req.eplTable != null) {
		// Premier League
		req.eplData = {
			competitionName: 'Premier League ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'premier-league',
			competitionStatus: fixtureHelper.getTeamPosition(req.eplTable.map(team => team.teamName)),
			competitionTable: req.eplTable
		};
	}
	if(req.uclTable != null) {
		// Champions League
		// First store group stage standings results
		req.uclData = {
			competitionName: 'Champions League ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'champions-league',
			competitionTable: req.uclTable,
			groupStagePosition: fixtureHelper.getTeamPosition(req.uclTable.map(team => team.teamName))
		};
		// Now store knockout stages results (if applicable)
		if(req.fixtures != null) {
			const uclFixtures = req.fixtures.filter(match => match.competition == 4 && match.round > 6);
			if(uclFixtures != null && uclFixtures.length > 0) {
				req.uclData.fixtures = uclFixtures.reverse();
				req.uclData = fixtureHelper.getCompetitionStatus(0, 4, req.uclData);
			}
		}
	}
	if(req.europaLeagueTable != null) {
		// Europa League
		// First store group stage standings results
		req.europaLeagueData = {
			competitionName: 'Europa League ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'europa-league',
			competitionTable: req.europaLeagueTable,
			groupStagePosition: fixtureHelper.getTeamPosition(req.europaLeagueTable.map(team => team.teamName))
		};
		// Now store knockout stages results (if applicable)
		if(req.fixtures != null) {
			const europaLeagueFixtures = req.fixtures.filter(match => match.competition == 5 && match.round > 6);
			if(europaLeagueFixtures != null && europaLeagueFixtures.length > 0) {
				req.europaLeagueData.fixtures = europaLeagueFixtures.reverse();
				req.europaLeagueData = fixtureHelper.getCompetitionStatus(0, 5, req.europaLeagueData);
			}
		}
	}
	if(req.fixtures != null) {
		// FA Cup
		const faCupFixtures = req.fixtures.filter(match => match.competition == 1);
		if(faCupFixtures != null && faCupFixtures.length > 0) {
			req.faCupData = {
				competitionName: 'FA CUP ' + CURRENT_SEASON,
				competitionLink: STANDINGS_LOCATION + 'fa-cup',
				fixtures: faCupFixtures.reverse()
			};
			req.faCupData = fixtureHelper.getCompetitionStatus(0, 1, req.faCupData);
		}
		// Carabao Cup
		const carabaoCupFixtures = req.fixtures.filter(match => match.competition == 2);
		if(carabaoCupFixtures != null && carabaoCupFixtures.length > 0) {
			req.carabaoCupData = {
				competitionName: 'CARABAO CUP ' + CURRENT_SEASON,
				competitionLink: STANDINGS_LOCATION + 'carabao-cup',
				fixtures: carabaoCupFixtures.reverse()
			};
			req.carabaoCupData = fixtureHelper.getCompetitionStatus(0, 2, req.carabaoCupData);
		}
		// Community Shield
		const communityShieldFixtures = req.fixtures.filter(match => match.competition == 3);
		if(communityShieldFixtures != null && communityShieldFixtures.length > 0) {
			console.log(communityShieldFixtures);
			req.communityShieldData = {
				competitionName: 'COMMUNITY SHIELD ' + CURRENT_SEASON,
				competitionLink: STANDINGS_LOCATION + 'community-shield',
				fixtures: communityShieldFixtures.reverse()
			};
			req.communityShieldData = fixtureHelper.getCompetitionStatus(0, 3, req.communityShieldData);
		}
		// UEFA Super Cup
		const superCupFixtures = req.fixtures.filter(match => match.competition == 6);
		if(superCupFixtures != null && superCupFixtures.length > 0) {
			req.superCupData = {
				competitionName: 'UEFA SUPER CUP ' + CURRENT_SEASON,
				competitionLink: STANDINGS_LOCATION + 'super-cup',
				fixtures: superCupFixtures.reverse()
			};
			req.superCupData = fixtureHelper.getCompetitionStatus(0, 6, req.superCupData);
		}
		// FA Youth Cup
		const faYouthCupFixtures = req.fixtures.filter(match => match.competition == 15);
		if(faYouthCupFixtures != null && faYouthCupFixtures.length > 0) {
			req.faYouthCupData = {
				competitionName: 'FA YOUTH CUP ' + CURRENT_SEASON,
				competitionLink: STANDINGS_LOCATION + 'fa-youth-cup',
				fixtures: faYouthCupFixtures.reverse()
			};
			req.faYouthCupData = fixtureHelper.getCompetitionStatus(2, 15, req.faYouthCupData);
		}
		// Otten Cup
		const ottenCupFixtures = req.fixtures.filter(match => match.competition == 16);
		if(ottenCupFixtures != null && ottenCupFixtures.length > 0) {
			req.ottenCupData = {
				competitionName: 'OTTEN CUP ' + CURRENT_SEASON,
				competitionLink: STANDINGS_LOCATION + 'otten-cup',
				fixtures: ottenCupFixtures.reverse()
			};
			req.ottenCupData = fixtureHelper.getCompetitionStatus(2, 16, req.ottenCupData);
		}
		// Sparkasse & VGH Cup
		const vghCupFixtures = req.fixtures.filter(match => match.competition == 17);
		if(vghCupFixtures != null && vghCupFixtures.length > 0) {
			req.vghCupData = {
				competitionName: 'SPARKASSE & VGH CUP ' + CURRENT_SEASON,
				competitionLink: STANDINGS_LOCATION + 'vgh-cup',
				fixtures: vghCupFixtures.reverse()
			};
			req.vghCupData = fixtureHelper.getCompetitionStatus(2, 17, req.vghCupData);
		}
		// Dallas Cup
		const dallasCupFixtures = req.fixtures.filter(match => match.competition == 18);
		if(dallasCupFixtures != null && dallasCupFixtures.length > 0) {
			req.dallasCupData = {
				competitionName: 'DALLAS CUP ' + CURRENT_SEASON,
				competitionLink: STANDINGS_LOCATION + 'dallas-cup',
				fixtures: dallasCupFixtures.reverse()
			};
			req.dallasCupData = fixtureHelper.getCompetitionStatus(2, 18, req.dallasCupData);
		}
	}
	return next();
};
