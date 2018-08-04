// To scrape table using Cheerio
const rp = require('request-promise');
const cheerio = require('cheerio');

// Get Helper Functions
const { TEAMS } = require('../helpers/teams');
const { getClubData } = require('../helpers/clubs');
const { COMPETITIONS, getTeamByCompetitionID } = require('../helpers/competitions');
const {
	getPositionColorByCompetitionID,
	getTeamPosition,
	getKnockoutCompetitionStatus,
	getMixedCompetitionStatus
 } = require('../helpers/standings');

// Define Constants
const CURRENT_SEASON = ' 2018/19';
const STANDINGS_LOCATION = '/standings/';
const RESERVES_STANDINGS_LOCATION = '/reserves-standings/';
const ACADEMY_STANDINGS_LOCATION = '/academy-standings/';
const WOMEN_STANDINGS_LOCATION = '/women-standings/';


// Get fixtures for the given team
function getSoccerwayTableStandings(competitionID, tableURL, tableID, req, res, next) {
	if(tableURL == null || tableURL == '' || tableID == null || tableID == '') {
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
					name: $(teamData).children('.text.team.large-link').find('a[title]').attr('title'),
					position: i + 1,
					playedGames: parseInt($(teamData).children('.number.total.mp').text()),
					wins: parseInt($(teamData).children('.number.total.won.total_won').text()),
					draws: parseInt($(teamData).children('.number.total.drawn.total_drawn').text()),
					losses: parseInt($(teamData).children('.number.total.lost.total_lost').text()),
					goals: parseInt($(teamData).children('.number.total.gf.total_gf').text()),
					goalsAgainst: parseInt($(teamData).children('.number.total.ga.total_ga').text()),
					goalDifference: parseInt($(teamData).children('.number.gd').text()),
					points: parseInt($(teamData).children('.number.points').text())
				};

				// Remove team name ending for youth teams
				if(getTeamByCompetitionID(competitionID) == TEAMS.RESERVES || getTeamByCompetitionID(competitionID) == TEAMS.ACADEMY) {
					curTeamData.name = curTeamData.name.slice(0, -4);
				}

				// Store Appropriate Color Based On The Table Position
				curTeamData.color = getPositionColorByCompetitionID(competitionID, curTeamData.position);
				// Store Club Data
				curTeamData.teamData = getClubData(curTeamData.name.trim(), curTeamData.team, curTeamData.competitionID);

				// Add Team Data To Standings
				standings.push(curTeamData);
			});

			// Save the standings according to the competition
			switch(competitionID) {
				case COMPETITIONS.PREMIER_LEAGUE:
					req.eplTable = standings;
					break;
				case COMPETITIONS.CHAMPIONS_LEAGUE:
					req.uclTable = standings;
					break;
				case COMPETITIONS.EUROPA_LEAGUE:
					req.europaLeagueTable = standings;
					break;
				case COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP:
					req.iccTable = standings;
					break;
				case COMPETITIONS.PREMIER_LEAGUE_2:
					req.pl2Table = standings;
					break;
				case COMPETITIONS.PREMIER_LEAGUE_2_DIV_2:
					req.pl2Div2Table = standings;
					break;
				case COMPETITIONS.PL_INTERNATIONAL_CUP:
					req.plIntlCupTable = standings;
					break;
				case COMPETITIONS.YOUTH_LEAGUE:
					req.youthLeagueTable = standings;
					break;
				case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
					req.u18PlNorthTable = standings;
					break;
				case COMPETITIONS.U18_PREMIER_LEAGUE_CUP:
					req.plCupTable = standings;
					break;
				case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
					req.faWomenChampionshipTable = standings;
					break;
				case COMPETITIONS.FA_WSL_CUP:
					req.faWSLCupTable = standings;
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
	const tableURL = 'https://uk.soccerway.com/national/england/premier-league/20182019/regular-season/r48730/';
	const tableID = '#page_competition_1_block_competition_tables_6_block_competition_league_table_1_table';
	return getSoccerwayTableStandings(COMPETITIONS.PREMIER_LEAGUE, tableURL, tableID, req, res, next);
};

// Get the Champions League standings
exports.getUCLTable = (req, res, next) => {
	if(req.uclData != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getSoccerwayTableStandings(COMPETITIONS.CHAMPIONS_LEAGUE, tableURL, tableID, req, res, next);
};

// Get the Europa League standings
exports.getEuropaLeagueTable = (req, res, next) => {
	if(req.europaLeagueData != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getSoccerwayTableStandings(COMPETITIONS.EUROPA_LEAGUE, tableURL, tableID, req, res, next);
};

// Get the International Champions Cup Standings
exports.getICCTable = (req, res, next) => {
	if(req.iccData != null) {
		return next();
	}
	const tableURL = 'https://us.soccerway.com/international/world/international-champions-cup/2018/china-pr/r43217/';
	const tableID = '#page_competition_1_block_competition_tables_7_block_competition_league_table_1_table';
	return getSoccerwayTableStandings(COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP, tableURL, tableID, req, res, next);
};

// Get the Premier League 2 Standings
exports.getPL2Table = (req, res, next) => {
	if(req.pl2Data != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getSoccerwayTableStandings(COMPETITIONS.PREMIER_LEAGUE_2, tableURL, tableID, req, res, next);
};

// Get the Premier League 2 Division 2 Standings
exports.getPL2Div2Table = (req, res, next) => {
	if(req.pl2Div2Data != null) {
		return next();
	}
	const tableURL = 'https://us.soccerway.com/national/england/premier-league-2-division-two/20182019/regular-season/r49650/tables/?ICID=PL_3N_03';
	const tableID = '#page_competition_1_block_competition_tables_5_block_competition_league_table_1_table';
	return getSoccerwayTableStandings(COMPETITIONS.PREMIER_LEAGUE_2_DIV_2, tableURL, tableID, req, res, next);
};

// Get the PL International Cup Standings
exports.getPLInternationalCupTable = (req, res, next) => {
	if(req.plIntlCupData != null) {
		return next();
	}
	const tableURL = 'https://us.soccerway.com/international/europe/premier-league-international-cup/20182019/group-stage/r47607/';
	const tableID = '#page_competition_1_block_competition_tables_group_13_block_competition_league_table_1_table';
	return getSoccerwayTableStandings(COMPETITIONS.PL_INTERNATIONAL_CUP, tableURL, tableID, req, res, next);
};

// Get the Under-19 UEFA Youth League Standings
exports.getYouthLeagueTable = (req, res, next) => {
	if(req.youthLeagueData != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getSoccerwayTableStandings(COMPETITIONS.YOUTH_LEAGUE, tableURL, tableID, req, res, next);
};

// Get the U18 Premier League North Standings
exports.getU18PLTable = (req, res, next) => {
	if(req.u18PlNorthData != null) {
		return next();
	}
	const tableURL = 'https://us.soccerway.com/national/england/premier-academy-league/20182019/north/r49673/';
	const tableID = '#page_competition_1_block_competition_tables_7_block_competition_league_table_1_table';
	return getSoccerwayTableStandings(COMPETITIONS.U18_PREMIER_LEAGUE_NORTH, tableURL, tableID, req, res, next);
};

// Get the U18 Premier League Cup Standings
exports.getU18PLCupTable = (req, res, next) => {
	if(req.plCupData != null) {
		return next();
	}
	const tableURL = '';
	const tableID = '';
	return getSoccerwayTableStandings(COMPETITIONS.U18_PREMIER_LEAGUE_CUP, tableURL, tableID, req, res, next);
};

// Get the FA Women's Championship Standings
exports.getFAWomenChampionshipTable = (req, res, next) => {
	if(req.faWomenChampionshipData != null) {
		return next();
	}
	const tableURL = 'https://us.soccerway.com/national/england/wsl-2/20182019/regular-season/r48048/';
	const tableID = '#page_competition_1_block_competition_tables_7_block_competition_league_table_1_table';
	return getSoccerwayTableStandings(COMPETITIONS.FA_WOMEN_CHAMPIONSHIP, tableURL, tableID, req, res, next);
};

// Get the FA WSL Continental Tyres Cup
exports.getFAWSLCupTable = (req, res, next) => {
	if(req.faWSLCupData != null) {
		return next();
	}
	const tableURL = 'https://us.women.soccerway.com/national/england/wsl-cup/20182019/group-stage/group-2-north/g13001/';
	const tableID = '#page_competition_1_block_competition_tables_8_block_competition_league_table_1_table';
	return getSoccerwayTableStandings(COMPETITIONS.FA_WSL_CUP, tableURL, tableID, req, res, next);
};




// Process Standings Data
exports.processStandingsData = (req, res, next) => {
	// Process all types of competitions
	processTableCompetitions(req);
	processMixedCompetitions(req);
	processKnockoutCompetitions(req);

	// Continue
	return next();
};


function processTableCompetitions(req) {
	// Premier League
	if(req.eplData == null && req.eplTable != null) {
		req.eplData = {
			competitionName: 'Premier League ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'premier-league',
			competitionStatus: getTeamPosition(req.eplTable.map(team => team.teamData.teamName)),
			competitionTable: req.eplTable
		};
	}

	// International Champions Cup
	if(req.iccData == null && req.iccTable != null) {
		req.iccData = {
			competitionName: 'International Champions Cup ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'international-champions-cup',
			competitionStatus: getTeamPosition(req.iccTable.map(team => team.teamData.teamName)),
			competitionTable: req.iccTable
		};
	}

	// Premier League 2
	if(req.pl2Data == null && req.pl2Table != null) {
		req.pl2Data = {
			competitionName: 'Premier League 2 ' + CURRENT_SEASON,
			competitionLink: RESERVES_STANDINGS_LOCATION + 'premier-league-2',
			competitionStatus: getTeamPosition(req.pl2Table.map(team => team.teamData.teamName)),
			competitionTable: req.pl2Table
		};
	}

	// Premier League 2 Division 2
	if(req.pl2Div2Data == null && req.pl2Div2Table != null) {
		req.pl2Div2Data = {
			competitionName: 'Premier League 2 Division II' + CURRENT_SEASON,
			competitionLink: RESERVES_STANDINGS_LOCATION + 'premier-league-2-div-2',
			competitionStatus: getTeamPosition(req.pl2Div2Table.map(team => team.teamData.teamName)),
			competitionTable: req.pl2Div2Table
		};
	}

	// U18 Premier League North
	if(req.u18PlNorthData == null && req.u18PlNorthTable != null) {
		req.u18PlNorthData = {
			competitionName: 'U18 Premier League North' + CURRENT_SEASON,
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'premier-league-north',
			competitionStatus: getTeamPosition(req.u18PlNorthTable.map(team => team.teamData.teamName)),
			competitionTable: req.u18PlNorthTable
		};
	}

	// FA Women's Championship
	if(req.faWomenChampionshipData == null && req.faWomenChampionshipTable != null) {
		req.faWomenChampionshipData = {
			competitionName: 'FA Women\'s Championship' + CURRENT_SEASON,
			competitionLink: WOMEN_STANDINGS_LOCATION + 'fa-women-championship',
			competitionStatus: getTeamPosition(req.faWomenChampionshipTable.map(team => team.teamData.teamName)),
			competitionTable: req.faWomenChampionshipTable
		};
	}
}

function processMixedCompetitions(req) {
	// Champions League
	if(req.uclData == null) {
		// Store basic information
		req.uclData = {
			competitionName: 'Champions League ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'champions-league'
		};

		// Store group stage standings results
		if(req.uclTable != null) {
			req.uclData.competitionTable = req.uclTable;
			req.uclData.groupStagePosition = getTeamPosition(req.uclTable.map(team => team.teamData.teamName));
		}

		// Get relevant fixtures
		if(req.fixtures != null && req.fixtures.length > 0) {
			const ucl_games = req.fixtures.filter(match => match.competition == COMPETITIONS.CHAMPIONS_LEAGUE).reverse();
			if(ucl_games != null && ucl_games.length > 0) {
				req.uclData.fixtures = ucl_games;
			}
		}

		// Set competition status
		getMixedCompetitionStatus(COMPETITIONS.CHAMPIONS_LEAGUE, req.uclData);
	}

	// Europa League
	if(req.europaLeagueData == null) {
		// Store basic information
		req.europaLeagueData = {
			competitionName: 'Europa League ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'europa-league'
		};

		// Store group stage standings results
		if(req.europaLeagueTable != null) {
			req.europaLeagueData.competitionTable = req.europaLeagueTable;
			req.europaLeagueData.groupStagePosition = getTeamPosition(req.europaLeagueTable.map(team => team.teamData.teamName));
		}

		// Get relevant fixtures
		if(req.fixtures != null && req.fixtures.length > 0) {
			const europa_games = req.fixtures.filter(match => match.competition == COMPETITIONS.EUROPA_LEAGUE).reverse();
			if(europa_games != null && europa_games.length > 0) {
				req.europaLeagueData.fixtures = europa_games;
			}
		}

		// Set competition status
		getMixedCompetitionStatus(COMPETITIONS.EUROPA_LEAGUE, req.europaLeagueData);
	}

	// Premier League International Cup
	if(req.plIntlCupData == null) {
		// Store basic information
		req.plIntlCupData = {
			competitionName: 'Premier League International Cup ' + CURRENT_SEASON,
			competitionLink: RESERVES_STANDINGS_LOCATION + 'pl-international-cup'
		};

		// Store group stage standings results
		if(req.plIntlCupTable != null) {
			req.plIntlCupData.competitionTable = req.plIntlCupTable;
			req.plIntlCupData.groupStagePosition = getTeamPosition(req.plIntlCupTable.map(team => team.teamData.teamName));
		}

		// Get relevant fixtures
		if(req.fixtures != null && req.fixtures.length > 0) {
			const plIntlCup_games = req.fixtures.filter(match => match.competition == COMPETITIONS.PL_INTERNATIONAL_CUP).reverse();
			if(plIntlCup_games != null && plIntlCup_games.length > 0) {
				req.plIntlCupData.fixtures = plIntlCup_games;
			}
		}

		// Set competition status
		getMixedCompetitionStatus(COMPETITIONS.PL_INTERNATIONAL_CUP, req.plIntlCupData);
	}

	// Under-19 UEFA Youth League
	if(req.youthLeagueData == null) {
		// Store basic information
		req.youthLeagueData = {
			competitionName: 'UEFA Youth League ' + CURRENT_SEASON,
			competitionLink: RESERVES_STANDINGS_LOCATION + 'youth-league'
		};

		// Store group stage standings results
		if(req.youthLeagueTable != null) {
			req.youthLeagueData.competitionTable = req.youthLeagueTable;
			req.youthLeagueData.groupStagePosition = getTeamPosition(req.youthLeagueTable.map(team => team.teamData.teamName));
		}

		// Get relevant fixtures
		if(req.fixtures != null && req.fixtures.length > 0) {
			const youthLeague_games = req.fixtures.filter(match => match.competition == COMPETITIONS.YOUTH_LEAGUE).reverse();
			if(youthLeague_games != null && youthLeague_games.length > 0) {
				req.youthLeagueData.fixtures = youthLeague_games;
			}
		}

		// Set competition status
		getMixedCompetitionStatus(COMPETITIONS.YOUTH_LEAGUE, req.youthLeagueData);
	}

	// U18 Premier League Cup
	if(req.plCupData == null) {
		// Store basic information
		req.plCupData = {
			competitionName: 'U18 Premier League Cup ' + CURRENT_SEASON,
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'premier-league-cup'
		};

		// Store group stage standings results
		if(req.plCupTable != null) {
			req.plCupData.competitionTable = req.plCupTable;
			req.plCupData.groupStagePosition = getTeamPosition(req.plCupTable.map(team => team.teamData.teamName));
		}

		// Get relevant fixtures
		if(req.fixtures != null && req.fixtures.length > 0) {
			const plCup_games = req.fixtures.filter(match => match.competition == COMPETITIONS.U18_PL_CUP).reverse();
			if(plCup_games != null && plCup_games.length > 0) {
				req.plCupData.fixtures = plCup_games;
			}
		}

		// Set competition status
		getMixedCompetitionStatus(COMPETITIONS.U18_PL_CUP, req.plCupData);
	}

	// FA WSL Continental Tyres Cup
	if(req.faWSLCupData == null) {
		// Store basic information
		req.faWSLCupData = {
			competitionName: 'FA WSL Continental Tyres Cup ' + CURRENT_SEASON,
			competitionLink: WOMEN_STANDINGS_LOCATION + 'fa-wsl-cup'
		};

		// Store group stage standings results
		if(req.faWSLCupTable != null) {
			req.faWSLCupData.competitionTable = req.faWSLCupTable;
			req.faWSLCupData.groupStagePosition = getTeamPosition(req.faWSLCupTable.map(team => team.teamData.teamName));
		}

		// Get relevant fixtures
		if(req.fixtures != null && req.fixtures.length > 0) {
			const faWSLCup_games = req.fixtures.filter(match => match.competition == COMPETITIONS.FA_WSL_CUP).reverse();
			if(faWSLCup_games != null && faWSLCup_games.length > 0) {
				req.faWSLCupData.fixtures = faWSLCup_games;
			}
		}

		// Set competition status
		getMixedCompetitionStatus(COMPETITIONS.FA_WSL_CUP, req.faWSLCupData);
	}
}

function processKnockoutCompetitions(req) {
	if(req.fixtures == null || req.fixtures.length == 0) {
		return;
	}

	// FA Cup
	const faCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.FA_CUP).reverse();
	if(faCupFixtures != null && faCupFixtures.length > 0) {
		req.faCupData = {
			competitionName: 'FA CUP ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'fa-cup',
			fixtures: faCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.FA_CUP, req.faCupData);
	}

	// Carabao Cup
	const carabaoCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.CARABAO_CUP).reverse();
	if(carabaoCupFixtures != null && carabaoCupFixtures.length > 0) {
		req.carabaoCupData = {
			competitionName: 'CARABAO CUP ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'carabao-cup',
			fixtures: carabaoCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.CARABAO_CUP, req.carabaoCupData);
	}

	// Community Shield
	const communityShieldFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.COMMUNITY_SHIELD).reverse();
	if(communityShieldFixtures != null && communityShieldFixtures.length > 0) {
		req.communityShieldData = {
			competitionName: 'COMMUNITY SHIELD ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'community-shield',
			fixtures: communityShieldFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.COMMUNITY_SHIELD, req.communityShieldData);
	}

	// UEFA Super Cup
	const superCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.SUPER_CUP).reverse();
	if(superCupFixtures != null && superCupFixtures.length > 0) {
		req.superCupData = {
			competitionName: 'UEFA SUPER CUP ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'super-cup',
			fixtures: superCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.SUPER_CUP, req.superCupData);
	}

	// FIFA Club World Cup
	const clubWorldCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.CLUB_WORLD_CUP).reverse();
	if(clubWorldCupFixtures != null && clubWorldCupFixtures.length > 0) {
		req.clubWorldCupData = {
			competitionName: 'FIFA CLUB WORLD CUP ' + CURRENT_SEASON,
			competitionLink: STANDINGS_LOCATION + 'club-world-cup',
			fixtures: clubWorldCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.CLUB_WORLD_CUP, req.clubWorldCupData);
	}

	// FA Youth Cup
	const faYouthCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.FA_YOUTH_CUP).reverse();
	if(faYouthCupFixtures != null && faYouthCupFixtures.length > 0) {
		req.faYouthCupData = {
			competitionName: 'FA YOUTH CUP ' + CURRENT_SEASON,
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'fa-youth-cup',
			fixtures: faYouthCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.FA_YOUTH_CUP, req.faYouthCupData);
	}

	// Ruhr Cup
	const ruhrCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.RUHR_CUP).reverse();
	if(ruhrCupFixtures != null && ruhrCupFixtures.length > 0) {
		req.ruhrCupData = {
			competitionName: 'RUHR CUP ' + CURRENT_SEASON,
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'ruhr-cup',
			fixtures: ruhrCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.RUHR_CUP, req.ruhrCupData);
	}

	// Otten Cup
	const ottenCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.OTTEN_CUP).reverse();
	if(ottenCupFixtures != null && ottenCupFixtures.length > 0) {
		req.ottenCupData = {
			competitionName: 'OTTEN CUP ' + CURRENT_SEASON,
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'otten-cup',
			fixtures: ottenCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.OTTEN_CUP, req.ottenCupData);
	}

	// Sparkasse & VGH Cup
	const vghCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.VGH_CUP).reverse();
	if(vghCupFixtures != null && vghCupFixtures.length > 0) {
		req.vghCupData = {
			competitionName: 'SPARKASSE & VGH CUP ' + CURRENT_SEASON,
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'vgh-cup',
			fixtures: vghCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.VGH_CUP, req.vghCupData);
	}

	// Dallas Cup
	const dallasCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.DALLAS_CUP).reverse();
	if(dallasCupFixtures != null && dallasCupFixtures.length > 0) {
		req.dallasCupData = {
			competitionName: 'DALLAS CUP ' + CURRENT_SEASON,
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'dallas-cup',
			fixtures: dallasCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.DALLAS_CUP, req.dallasCupData);
	}
}