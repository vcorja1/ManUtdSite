const http = require('http');
// To scrape table using Cheerio
const rp = require('request-promise');
const cheerio = require('cheerio');
// Get Fixture Status
const fixtureHelper = require('../helpers/fixtures.js');
// Define Constants
const CURRENT_SEASON = '2017/18';
const STANDINGS_LOCATION = '/standings/';
const RESERVES_STANDINGS_LOCATION = '/reserves-standings/';
const ACADEMY_STANDINGS_LOCATION = '/academy-standings/';

// Get fixtures for the given team
function getTableStandings(competitionID, tableURL, tableID, req, res, next) {
	if(tableURL == null || tableURL == '') {
		return next();
	}

	const OPTIONS = {
		uri: tableURL,
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	rp(OPTIONS)
		.then( ($) => {
			// REQUEST SUCCEEDED: SCRAPE STANDINGS
			let standings = [];

			let table = $(`${tableID} > tbody`);
			$(table).children().map( (i, teamData) => {
				// Scrape data for each team in the table
				let curTeamData = {
					teamNameLong: $(teamData).children('.text.team.large-link').children('a').attr('title'),
					position: i + 1,
					playedGames: $(teamData).children('.number.total.mp').text(),
					wins: $(teamData).children('.number.total.won.total_won').text(),
					draws: $(teamData).children('.number.total.drawn.total_drawn').text(),
					losses: $(teamData).children('.number.total.lost.total_lost').text(),
					goals: $(teamData).children('.number.total.gf.total_gf').text(),
					goalsAgainst: $(teamData).children('.number.total.ga.total_ga').text(),
					goalDifference: $(teamData).children('.number.gd').text(),
					points: $(teamData).children('.number.points').text()
				};
				// Get Team's Proper Full Name
				if(fixtureHelper.getTeamByCompetitionID(competitionID) == 0) {
					curTeamData.teamName = curTeamData.teamNameLong;
				}
				else {
					curTeamData.teamName = curTeamData.teamNameLong.slice(0, -4);;
				}
				// Special Cases
				if(curTeamData.teamName == 'Wolves') {
					curTeamData.teamName = 'Wolverhampton Wanderers';
				}
				else if(curTeamData.teamName == 'Atlético Madrid') {
					curTeamData.teamName == 'Atletico Madrid';
				}
				else if(curTeamData.teamName == 'Bayern München') {
					curTeamData.teamName = 'Bayern Munich';
				}
				else if(curTeamData.teamName == 'Internazionale') {
					curTeamData.teamName = 'Inter Milan';
				}
				else if(curTeamData.teamName == 'Milan') {
					curTeamData.teamName = 'AC Milan';
				}
				else if(curTeamData.teamName == 'PSG') {
					curTeamData.teamName = 'Paris Saint-Germain';
				}
				// Store Appropriate Color Based On The Table Position
				curTeamData.color = fixtureHelper.getPositionColorByCompetitionID(competitionID, curTeamData.position);
				// Store Club Logo
				curTeamData.crestURI = fixtureHelper.getClubLogoSrc(curTeamData.teamName);

				// Add Team Data To Standings
				standings.push(curTeamData);
			});

			// Save the standings according to the competition
			switch(competitionID) {
				case 0: 	// Premier League
					req.eplTable = standings;
					break;
				case 4: 	// Champions League
					req.uclTable = standings;
					break;
				case 5: 	// Europa League
					req.europaLeagueTable = standings;
					break;
				case 8: 	// Premier League 2
					req.iccTable = standings;
					break;
				case 10: 	// Premier League 2
					req.pl2Table = standings;
					break;
				case 11: 	// Premier League International Cup
					req.plIntlCupTable = standings;
					break;
				case 12: 	// Under-19 UEFA Youth League
					req.youthLeagueTable = standings;
					break;
				case 13: 	// U18 Premier League North
					req.plNorthTable = standings;
					break;
				case 15: 	// U18 Premier League Cup
					req.plCupTable = standings;
					break;
			}

			// Continue
			return next();
	    })
	    .catch(function (err) {
	        // REQUEST FAILED: IGNORE THIS REQUEST
			console.log(err);
	        return next();
	    });
}

// Get the Premier League Standings
exports.getEPLTable = (req, res, next) => {
	if(req.eplData != null) {
		return next();
	}

	const tableURL = 'http://api.football-data.org/v1/competitions/445/leagueTable/?matchday=38';

	http.get(tableURL, (resp) => {
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
					team.color = fixtureHelper.getPositionColorByCompetitionID(0, team.position);
					// Store Our Own Crest URI
					team.crestURI = fixtureHelper.getClubLogoSrc(team.teamName);
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
	if(req.uclData != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getTableStandings(4, tableURL, tableID, req, res, next);
};

// Get the Europa League standings
exports.getEuropaLeagueTable = (req, res, next) => {
	if(req.europaLeagueData != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getTableStandings(5, tableURL, tableID, req, res, next);
};

// Get the International Champions Cup Standings
exports.getICCTable = (req, res, next) => {
	if(req.iccData != null) {
		return next();
	}
	const tableURL = 'https://us.soccerway.com/international/world/international-champions-cup/2018/china-pr/r43217/';
	const tableID = '#page_competition_1_block_competition_tables_7_block_competition_league_table_1_table';
	return getTableStandings(8, tableURL, tableID, req, res, next);
};

// Get the Premier League 2 Standings
exports.getPL2Table = (req, res, next) => {
	if(req.pl2Data != null) {
		return next();
	}
	const tableURL = 'https://uk.soccerway.com/national/england/premier-league-2-division-one/20172018/regular-season/r43195/';
	const tableID = '#page_competition_1_block_competition_tables_6_block_competition_league_table_1_table';
	return getTableStandings(10, tableURL, tableID, req, res, next);
};

// Get the PL International Cup Standings
exports.getPLInternationalCupTable = (req, res, next) => {
	if(req.plIntlCupData != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getTableStandings(11, tableURL, tableID, req, res, next);
};

// Get the Under-19 UEFA Youth League Standings
exports.getYouthLeagueTable = (req, res, next) => {
	if(req.youthLeagueData != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getTableStandings(12, tableURL, tableID, req, res, next);
};

// Get the U18 Premier League North Standings
exports.getU18PLTable = (req, res, next) => {
	if(req.plNorthData != null) {
		return next();
	}
	const tableURL = 'https://uk.soccerway.com/national/england/premier-academy-league/20172018/north/r43221/';
	const tableID = '#page_competition_1_block_competition_tables_6_block_competition_league_table_1_table';
	return getTableStandings(13, tableURL, tableID, req, res, next);
};

// Get the U18 Premier League Cup Standings
exports.getU18PLCupTable = (req, res, next) => {
	if(req.plCupData != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getTableStandings(15, tableURL, tableID, req, res, next);
};

// Process Cups That Haven't Been Drawn Yet
exports.processCupsNotDrawn = (req, res, next) => {
	const NOT_PARTICIPATING = 'Manchester United will not play in this competition this season.';

	// FA Cup
	req.faCupData = {
		specialNote: 'Manchester United will enter in the Third Round. The draw will take place in late 2018.',
		shouldDisplayInSummary: true
	};
	// Carabao Cup
	req.carabaoCupData = {
		specialNote: 'Manchester United will enter in the Third Round. The draw will take place later in 2018.',
		shouldDisplayInSummary: true
	};
	// Community Shield
	req.communityShieldData = {
		specialNote: NOT_PARTICIPATING,
		shouldDisplayInSummary: false
	};
	// Champions League
	req.uclData = {
		specialNote: 'Manchester United will enter in the Group Stage round. The draw will take place in Monaco on August 30, 2018.',
		shouldDisplayInSummary: true
	};
	// Europa League
	req.europaLeagueData = {
		specialNote: NOT_PARTICIPATING,
		shouldDisplayInSummary: false
	};
	// UEFA Super Cup
	req.superCupData = {
		specialNote: NOT_PARTICIPATING,
		shouldDisplayInSummary: false
	};
	// FIFA Club World Cup
	req.clubWorldCupData = {
		specialNote: NOT_PARTICIPATING,
		shouldDisplayInSummary: false
	};
	// Premier League International Cup
	req.plIntlCupData = {
		specialNote: NOT_PARTICIPATING,
		shouldDisplayInSummary: false
	};
	// Under-19 UEFA Youth League
	req.youthLeagueData = {
		specialNote: 'Manchester United will enter in the Group Stage round. The draw will take place in Monaco on August 30, 2018.',
		shouldDisplayInSummary: true
	};
	// FA Youth Cup
	req.faYouthCupData = {
		specialNote: 'Manchester United will enter in the Third Round. The draw will take place in late 2018.',
		shouldDisplayInSummary: true
	};
	return next();
}

// Process Standings Data
exports.processStandingsData = (req, res, next) => {
	/* ---------------- TABLE COMPETITION ---------------- */
	if(req.eplData != null) {
		// Premier League
		req.eplData.competitionName = 'Premier League ' + CURRENT_SEASON;
		req.eplData.competitionLink = STANDINGS_LOCATION + 'premier-league';
	}
	else if(req.eplTable != null) {
		// Premier League
		req.eplData = {
			competitionName: 'Premier League ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'premier-league',
			competitionStatus: fixtureHelper.getTeamPosition(req.eplTable.map(team => team.teamName)),
			competitionTable: req.eplTable
		};
	}
	if(req.pl2Data != null) {
		// Premier League 2
		req.pl2Data.competitionName = 'Premier League 2 ' + CURRENT_SEASON;
		req.pl2Data.competitionLink = RESERVES_STANDINGS_LOCATION + 'premier-league-2';
	}
	else if(req.pl2Table != null) {
		// Premier League 2
		req.pl2Data = {
			competitionName: 'Premier League 2 ' + CURRENT_SEASON,
			competitionLink: RESERVES_STANDINGS_LOCATION + 'premier-league-2',
			competitionStatus: fixtureHelper.getTeamPosition(req.pl2Table.map(team => team.teamName)),
			competitionTable: req.pl2Table
		};
	}
	if(req.plNorthData != null) {
		// U18 Premier League North
		req.plNorthData.competitionName = 'U18 Premier League North ' + CURRENT_SEASON;
		req.plNorthData.competitionLink = ACADEMY_STANDINGS_LOCATION + 'premier-league-north';
	}
	else if(req.plNorthTable != null) {
		// U18 Premier League North
		req.plNorthData = {
			competitionName: 'U18 Premier League North ' + CURRENT_SEASON,
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'premier-league-north',
			competitionStatus: fixtureHelper.getTeamPosition(req.plNorthTable.map(team => team.teamName)),
			competitionTable: req.plNorthTable
		};
	}
	if(req.iccData != null) {
		// International Champions Cup
		req.iccData.competitionName = 'International Champions Cup ' + CURRENT_SEASON;
		req.iccData.competitionLink = STANDINGS_LOCATION + 'international-champions-cup';
	}
	else if(req.iccTable != null) {
		// International Champions Cup
		req.iccData = {
			competitionName: 'International Champions Cup ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'international-champions-cup',
			competitionStatus: fixtureHelper.getTeamPosition(req.iccTable.map(team => team.teamName)),
			competitionTable: req.iccTable
		};
	}
	/* ---------------- MIXED COMPETITION ---------------- */
	if(req.uclData != null) {
		// Champions League
		req.uclData.competitionName = 'Champions League ' + CURRENT_SEASON;
		req.uclData.competitionLink = STANDINGS_LOCATION + 'champions-league';
	}
	else if(req.uclTable != null) {
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
				req.uclData = fixtureHelper.getCompetitionStatus(4, req.uclData);
			}
		}
	}
	if(req.europaLeagueData != null) {
		// Europa League
		req.europaLeagueData.competitionName = 'Europa League ' + CURRENT_SEASON;
		req.europaLeagueData.competitionLink = STANDINGS_LOCATION + 'europa-league';
	}
	else if(req.europaLeagueTable != null) {
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
				req.europaLeagueData = fixtureHelper.getCompetitionStatus(5, req.europaLeagueData);
			}
		}
	}
	if(req.plIntlCupData != null) {
		// Premier League International Cup
		req.plIntlCupData.competitionName = 'Premier League International Cup ' + CURRENT_SEASON;
		req.plIntlCupData.competitionLink = RESERVES_STANDINGS_LOCATION + 'pl-international-cup';
	}
	else if(req.plIntlCupTable != null) {
		// Premier League International Cup
		// First store group stage standings results
		req.plIntlCupData = {
			competitionName: 'Premier League International Cup ' + CURRENT_SEASON,
			competitionLink: RESERVES_STANDINGS_LOCATION + 'pl-international-cup',
			competitionTable: req.plIntlCupTable,
			groupStagePosition: fixtureHelper.getTeamPosition(req.plIntlCupTable.map(team => team.teamName))
		};
		// Now store knockout stages results (if applicable)
		if(req.fixtures != null) {
			const plIntlCupFixtures = req.fixtures.filter(match => match.competition == 11 && match.round > 3);
			if(plIntlCupFixtures != null && plIntlCupFixtures.length > 0) {
				req.plIntlCupData.fixtures = plIntlCupFixtures.reverse();
				req.plIntlCupData = fixtureHelper.getCompetitionStatus(11, req.plIntlCupData);
			}
		}
	}
	if(req.youthLeagueData != null) {
		// Under-19 UEFA Youth League
		req.youthLeagueData.competitionName = 'UEFA Youth League ' + CURRENT_SEASON;
		req.youthLeagueData.competitionLink = RESERVES_STANDINGS_LOCATION + 'youth-league';
	}
	else if(req.youthLeagueTable != null) {
		// Under-19 UEFA Youth League
		// First store group stage standings results
		req.youthLeagueData = {
			competitionName: 'UEFA Youth League ' + CURRENT_SEASON,
			competitionLink: RESERVES_STANDINGS_LOCATION + 'youth-league',
			competitionTable: req.youthLeagueTable,
			groupStagePosition: fixtureHelper.getTeamPosition(req.youthLeagueTable.map(team => team.teamName))
		};
		// Now store knockout stages results (if applicable)
		if(req.fixtures != null) {
			const youthLeagueFixtures = req.fixtures.filter(match => match.competition == 12 && match.round > 6);
			if(youthLeagueFixtures != null && youthLeagueFixtures.length > 0) {
				req.youthLeagueData.fixtures = youthLeagueFixtures.reverse();
				req.youthLeagueData = fixtureHelper.getCompetitionStatus(12, req.youthLeagueData);
			}
		}
	}
	if(req.plCupData != null) {
		// U18 Premier League Cup
		req.plCupData.competitionName = 'U18 Premier League Cup ' + CURRENT_SEASON;
		req.plCupData.competitionLink = ACADEMY_STANDINGS_LOCATION + 'premier-league-cup';
	}
	else if(req.plCupTable != null) {
		// U18 Premier League Cup
		// First store group stage standings results
		req.plCupData = {
			competitionName: 'U18 Premier League Cup ' + CURRENT_SEASON,
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'premier-league-cup',
			competitionTable: req.plCupTable,
			groupStagePosition: fixtureHelper.getTeamPosition(req.plCupTable.map(team => team.teamName))
		};
		// Now store knockout stages results (if applicable)
		if(req.fixtures != null) {
			const plCupFixtures = req.fixtures.filter(match => match.competition == 14 && match.round > 3);
			if(plCupFixtures != null && plCupFixtures.length > 0) {
				req.plCupData.fixtures = plCupFixtures.reverse();
				req.plCupData = fixtureHelper.getCompetitionStatus(11, req.plCupData);
			}
		}
	}
	/* ------------- KNOCKOUT COMPETITION ------------- */
	if(req.fixtures != null) {
		// FA Cup
		if(req.faCupData != null) {
			req.faCupData.competitionName = 'FA CUP ' + CURRENT_SEASON;
			req.faCupData.competitionLink = STANDINGS_LOCATION + 'fa-cup';
		}
		else {
			const faCupFixtures = req.fixtures.filter(match => match.competition == 1);
			if(faCupFixtures != null && faCupFixtures.length > 0) {
				req.faCupData = {
					competitionName: 'FA CUP ' + CURRENT_SEASON,
					competitionLink: STANDINGS_LOCATION + 'fa-cup',
					fixtures: faCupFixtures.reverse()
				};
				req.faCupData = fixtureHelper.getCompetitionStatus(1, req.faCupData);
			}
		}
		// Carabao Cup
		if(req.carabaoCupData != null) {
			req.carabaoCupData.competitionName = 'CARABAO CUP ' + CURRENT_SEASON;
			req.carabaoCupData.competitionLink = STANDINGS_LOCATION + 'carabao-cup';
		}
		else {
			const carabaoCupFixtures = req.fixtures.filter(match => match.competition == 2);
			if(carabaoCupFixtures != null && carabaoCupFixtures.length > 0) {
				req.carabaoCupData = {
					competitionName: 'CARABAO CUP ' + CURRENT_SEASON,
					competitionLink: STANDINGS_LOCATION + 'carabao-cup',
					fixtures: carabaoCupFixtures.reverse()
				};
				req.carabaoCupData = fixtureHelper.getCompetitionStatus(2, req.carabaoCupData);
			}
		}
		// Community Shield
		if(req.communityShieldData != null) {
			req.communityShieldData.competitionName = 'COMMUNITY SHIELD ' + CURRENT_SEASON;
			req.communityShieldData.competitionLink = STANDINGS_LOCATION + 'community-shield';
		}
		else {
			const communityShieldFixtures = req.fixtures.filter(match => match.competition == 3);
			if(communityShieldFixtures != null && communityShieldFixtures.length > 0) {
				req.communityShieldData = {
					competitionName: 'COMMUNITY SHIELD ' + CURRENT_SEASON,
					competitionLink: STANDINGS_LOCATION + 'community-shield',
					fixtures: communityShieldFixtures.reverse()
				};
				req.communityShieldData = fixtureHelper.getCompetitionStatus(3, req.communityShieldData);
			}
		}
		// UEFA Super Cup
		if(req.superCupData != null) {
			req.superCupData.competitionName = 'UEFA SUPER CUP ' + CURRENT_SEASON;
			req.superCupData.competitionLink = STANDINGS_LOCATION + 'super-cup';
		}
		else {
			const superCupFixtures = req.fixtures.filter(match => match.competition == 6);
			if(superCupFixtures != null && superCupFixtures.length > 0) {
				req.superCupData = {
					competitionName: 'UEFA SUPER CUP ' + CURRENT_SEASON,
					competitionLink: STANDINGS_LOCATION + 'super-cup',
					fixtures: superCupFixtures.reverse()
				};
				req.superCupData = fixtureHelper.getCompetitionStatus(6, req.superCupData);
			}
		}
		// FIFA Club World Cup
		if(req.clubWorldCupData != null) {
			req.clubWorldCupData.competitionName = 'FIFA CLUB WORLD CUP ' + CURRENT_SEASON;
			req.clubWorldCupData.competitionLink = STANDINGS_LOCATION + 'club-world-cup';
		}
		else {
			const clubWorldCupFixtures = req.fixtures.filter(match => match.competition == 7);
			if(clubWorldCupFixtures != null && clubWorldCupFixtures.length > 0) {
				req.clubWorldCupData = {
					competitionName: 'FIFA CLUB WORLD CUP ' + CURRENT_SEASON,
					competitionLink: STANDINGS_LOCATION + 'club-world-cup',
					fixtures: clubWorldCupFixtures.reverse()
				};
				req.clubWorldCupData = fixtureHelper.getCompetitionStatus(6, req.clubWorldCupData);
			}
		}
		// FA Youth Cup
		if(req.faYouthCupData != null) {
			req.faYouthCupData.competitionName = 'FA YOUTH CUP ' + CURRENT_SEASON;
			req.faYouthCupData.competitionLink = ACADEMY_STANDINGS_LOCATION + 'fa-youth-cup';
		}
		else {
			const faYouthCupFixtures = req.fixtures.filter(match => match.competition == 15);
			if(faYouthCupFixtures != null && faYouthCupFixtures.length > 0) {
				req.faYouthCupData = {
					competitionName: 'FA YOUTH CUP ' + CURRENT_SEASON,
					competitionLink: ACADEMY_STANDINGS_LOCATION + 'fa-youth-cup',
					fixtures: faYouthCupFixtures.reverse()
				};
				req.faYouthCupData = fixtureHelper.getCompetitionStatus(15, req.faYouthCupData);
			}
		}
		// Otten Cup
		if(req.ottenCupData != null) {
			req.ottenCupData.competitionName = 'OTTEN CUP ' + CURRENT_SEASON;
			req.ottenCupData.competitionLink = ACADEMY_STANDINGS_LOCATION + 'otten-cup';
		}
		else {
			const ottenCupFixtures = req.fixtures.filter(match => match.competition == 16);
			if(ottenCupFixtures != null && ottenCupFixtures.length > 0) {
				req.ottenCupData = {
					competitionName: 'OTTEN CUP ' + CURRENT_SEASON,
					competitionLink: ACADEMY_STANDINGS_LOCATION + 'otten-cup',
					fixtures: ottenCupFixtures.reverse()
				};
				req.ottenCupData = fixtureHelper.getCompetitionStatus(16, req.ottenCupData);
			}
		}
		// Sparkasse & VGH Cup
		if(req.vghCupData != null) {
			req.vghCupData.competitionName = 'SPARKASSE & VGH CUP ' + CURRENT_SEASON;
			req.vghCupData.competitionLink = ACADEMY_STANDINGS_LOCATION + 'vgh-cup';
		}
		else {
			const vghCupFixtures = req.fixtures.filter(match => match.competition == 17);
			if(vghCupFixtures != null && vghCupFixtures.length > 0) {
				req.vghCupData = {
					competitionName: 'SPARKASSE & VGH CUP ' + CURRENT_SEASON,
					competitionLink: ACADEMY_STANDINGS_LOCATION + 'vgh-cup',
					fixtures: vghCupFixtures.reverse()
				};
				req.vghCupData = fixtureHelper.getCompetitionStatus(17, req.vghCupData);
			}
		}
		// Dallas Cup
		if(req.dallasCupData != null) {
			req.dallasCupData.competitionName = 'DALLAS CUP ' + CURRENT_SEASON;
			req.dallasCupData.competitionLink = ACADEMY_STANDINGS_LOCATION + 'dallas-cup';
		}
		else {
			const dallasCupFixtures = req.fixtures.filter(match => match.competition == 18);
			if(dallasCupFixtures != null && dallasCupFixtures.length > 0) {
				req.dallasCupData = {
					competitionName: 'DALLAS CUP ' + CURRENT_SEASON,
					competitionLink: ACADEMY_STANDINGS_LOCATION + 'dallas-cup',
					fixtures: dallasCupFixtures.reverse()
				};
				req.dallasCupData = fixtureHelper.getCompetitionStatus(18, req.dallasCupData);
			}
		}
	}

	// Continue
	return next();
};
