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
	getTableCompetitionStatus,
	getKnockoutCompetitionStatus,
	getMixedCompetitionStatus
 } = require('../helpers/standings');

// Define Constants
const STANDINGS_LOCATION = '/standings/';
const RESERVES_STANDINGS_LOCATION = '/reserves-standings/';
const ACADEMY_STANDINGS_LOCATION = '/academy-standings/';
const WOMEN_STANDINGS_LOCATION = '/women-standings/';


// Get fixtures for the given team
function getSoccerwayTableStandings(competitionID, req, res, next) {
	const tableInfo = req.otherInfo.filter(row => row.info_name == 'TABLES' && row.info_competition == competitionID);
	if(tableInfo.length == 0) {
		return next();
	}

	const tableURL = tableInfo[0].info_value;
	const tableID = tableInfo[0].info_note;

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
				if((getTeamByCompetitionID(competitionID) == TEAMS.RESERVES || getTeamByCompetitionID(competitionID) == TEAMS.ACADEMY) && /.* U\d\d$/.test(curTeamData.name)) {
					curTeamData.name = curTeamData.name.slice(0, -4);
				}

				// Store Appropriate Color Based On The Table Position
				curTeamData.color = getPositionColorByCompetitionID(competitionID, curTeamData.position);

				// Store Club Data
				curTeamData.teamData = getClubData(curTeamData.name.trim(), null, competitionID);

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
				case COMPETITIONS.EFL_TROPHY:
					req.eflTrophyTable = standings;
					break;
				case COMPETITIONS.U19_UEFA_YOUTH_LEAGUE:
					req.youthLeagueTable = standings;
					break;
				case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
					req.u18PlNorthTable = standings;
					break;
				case COMPETITIONS.U18_PREMIER_LEAGUE_CUP:
					req.plCupTable = standings;
					break;
				case COMPETITIONS.FA_WOMEN_SUPER_LEAGUE:
					req.faWomenSuperLeagueTable = standings;
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
			console.error(err);
	        return next();
	    });
}


// Get the Premier League Standings
exports.getEPLTable = (req, res, next) => {
	if(req.eplData != null || req.eplTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.PREMIER_LEAGUE, req, res, next);
};

// Get the Champions League standings
exports.getUCLTable = (req, res, next) => {
	if(req.uclData != null || req.uclTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.CHAMPIONS_LEAGUE, req, res, next);
};

// Get the Europa League standings
exports.getEuropaLeagueTable = (req, res, next) => {
	if(req.europaLeagueData != null || req.europaLeagueTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.EUROPA_LEAGUE, req, res, next);
};

// Get the International Champions Cup Standings
exports.getICCTable = (req, res, next) => {
	if(req.iccData != null || req.iccTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP, req, res, next);
};

// Get the Premier League 2 Standings
exports.getPL2Table = (req, res, next) => {
	if(req.pl2Data != null || req.pl2Table != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.PREMIER_LEAGUE_2, req, res, next);
};

// Get the Premier League 2 Division 2 Standings
exports.getPL2Div2Table = (req, res, next) => {
	if(req.pl2Div2Data != null || req.pl2Div2Table != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.PREMIER_LEAGUE_2_DIV_2, req, res, next);
};

// Get the PL International Cup Standings
exports.getPLInternationalCupTable = (req, res, next) => {
	if(req.plIntlCupData != null || req.plIntlCupTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.PL_INTERNATIONAL_CUP, req, res, next);
};

// Get the EFL Trophy Standings
exports.getEFLTrophyTable = (req, res, next) => {
	if(req.eflTrophyData != null || req.eflTrophyTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.EFL_TROPHY, req, res, next);
};

// Get the Under-19 UEFA Youth League Standings
exports.getYouthLeagueTable = (req, res, next) => {
	if(req.youthLeagueData != null || req.youthLeagueTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.U19_UEFA_YOUTH_LEAGUE, req, res, next);
};

// Get the U18 Premier League North Standings
exports.getU18PLTable = (req, res, next) => {
	if(req.u18PlNorthData != null || req.u18PlNorthTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.U18_PREMIER_LEAGUE_NORTH, req, res, next);
};

// Get the U18 Premier League Cup Standings
exports.getU18PLCupTable = (req, res, next) => {
	if(req.plCupData != null || req.plCupTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.U18_PREMIER_LEAGUE_CUP, req, res, next);
};

// Get the FA Women's Super League Standings
exports.getFAWomenSuperLeagueTable = (req, res, next) => {
	if(req.faWomenSuperLeagueData != null || req.faWomenSuperLeagueTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.FA_WOMEN_SUPER_LEAGUE, req, res, next);
};

// Get the FA Women's Championship Standings
exports.getFAWomenChampionshipTable = (req, res, next) => {
	if(req.faWomenChampionshipData != null || req.faWomenChampionshipTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.FA_WOMEN_CHAMPIONSHIP, req, res, next);
};

// Get the FA WSL Continental Tyres Cup
exports.getFAWSLCupTable = (req, res, next) => {
	if(req.faWSLCupData != null || req.faWSLCupTable != null) {
		return next();
	}
	return getSoccerwayTableStandings(COMPETITIONS.FA_WSL_CUP, req, res, next);
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
			competitionName: 'Premier League',
			competitionLink: STANDINGS_LOCATION + 'premier-league',
			competitionTable: req.eplTable
		};

		// Set competition status
		getTableCompetitionStatus(COMPETITIONS.PREMIER_LEAGUE, req.eplData);
	}

	// International Champions Cup
	if(req.iccData == null && req.iccTable != null) {
		req.iccData = {
			competitionName: 'International Champions Cup',
			competitionLink: STANDINGS_LOCATION + 'international-champions-cup',
			competitionTable: req.iccTable
		};

		// Set competition status
		getTableCompetitionStatus(COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP, req.iccData);
	}

	// Premier League 2
	if(req.pl2Data == null && req.pl2Table != null) {
		req.pl2Data = {
			competitionName: 'Premier League 2',
			competitionLink: RESERVES_STANDINGS_LOCATION + 'premier-league-2',
			competitionTable: req.pl2Table
		};

		// Set competition status
		getTableCompetitionStatus(COMPETITIONS.PREMIER_LEAGUE_2, req.pl2Data);
	}

	// Premier League 2 Division 2
	if(req.pl2Div2Data == null && req.pl2Div2Table != null) {
		req.pl2Div2Data = {
			competitionName: 'Premier League 2 Division II',
			competitionLink: RESERVES_STANDINGS_LOCATION + 'premier-league-2-div-2',
			competitionTable: req.pl2Div2Table
		};

		// Set competition status
		getTableCompetitionStatus(COMPETITIONS.PREMIER_LEAGUE_2_DIV_2, req.pl2Div2Data);
	}

	// U18 Premier League North
	if(req.u18PlNorthData == null && req.u18PlNorthTable != null) {
		req.u18PlNorthData = {
			competitionName: 'U18 Premier League North',
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'premier-league-north',
			competitionTable: req.u18PlNorthTable
		};

		// Set competition status
		getTableCompetitionStatus(COMPETITIONS.U18_PREMIER_LEAGUE_NORTH, req.u18PlNorthData);
	}

	// FA Women's Super League
	if(req.faWomenSuperLeagueData == null && req.faWomenSuperLeagueTable != null) {
		req.faWomenSuperLeagueData = {
			competitionName: 'FA Women\'s Super League',
			competitionLink: WOMEN_STANDINGS_LOCATION + 'fa-women-super-league',
			competitionTable: req.faWomenSuperLeagueTable
		};

		// Set competition status
		getTableCompetitionStatus(COMPETITIONS.FA_WOMEN_SUPER_LEAGUE, req.faWomenSuperLeagueData);
	}

	// FA Women's Championship
	if(req.faWomenChampionshipData == null && req.faWomenChampionshipTable != null) {
		req.faWomenChampionshipData = {
			competitionName: 'FA Women\'s Championship',
			competitionLink: WOMEN_STANDINGS_LOCATION + 'fa-women-championship',
			competitionTable: req.faWomenChampionshipTable
		};

		// Set competition status
		getTableCompetitionStatus(COMPETITIONS.FA_WOMEN_CHAMPIONSHIP, req.faWomenChampionshipData);
	}
}

function processMixedCompetitions(req) {
	// Champions League
	if(req.uclData == null) {
		// Store basic information
		req.uclData = {
			competitionName: 'Champions League',
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
			competitionName: 'Europa League',
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
			competitionName: 'Premier League International Cup',
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

	// EFL Trophy
	if(req.eflTrophyData == null) {
		// Store basic information
		req.eflTrophyData = {
			competitionName: 'EFL Trophy',
			competitionLink: RESERVES_STANDINGS_LOCATION + 'efl-trophy'
		};

		// Store group stage standings results
		if(req.eflTrophyTable != null) {
			req.eflTrophyData.competitionTable = req.eflTrophyTable;
			req.eflTrophyData.groupStagePosition = getTeamPosition(req.eflTrophyTable.map(team => team.teamData.teamName));
		}

		// Get relevant fixtures
		if(req.fixtures != null && req.fixtures.length > 0) {
			const eflTrophy_games = req.fixtures.filter(match => match.competition == COMPETITIONS.EFL_TROPHY).reverse();
			if(eflTrophy_games != null && eflTrophy_games.length > 0) {
				req.eflTrophyData.fixtures = eflTrophy_games;
			}
		}

		// Set competition status
		getMixedCompetitionStatus(COMPETITIONS.EFL_TROPHY, req.eflTrophyData);
	}

	// // Under-19 UEFA Youth League
	if(req.youthLeagueData == null) {
		// Store basic information
		req.youthLeagueData = {
			competitionName: 'UEFA Youth League',
			competitionLink: RESERVES_STANDINGS_LOCATION + 'youth-league'
		};

		// Store group stage standings results
		if(req.youthLeagueTable != null) {
			req.youthLeagueData.competitionTable = req.youthLeagueTable;
			req.youthLeagueData.groupStagePosition = getTeamPosition(req.youthLeagueTable.map(team => team.teamData.teamName));
		}

		// Get relevant fixtures
		if(req.fixtures != null && req.fixtures.length > 0) {
			const youthLeague_games = req.fixtures.filter(match => match.competition == COMPETITIONS.U19_UEFA_YOUTH_LEAGUE).reverse();
			if(youthLeague_games != null && youthLeague_games.length > 0) {
				req.youthLeagueData.fixtures = youthLeague_games;
			}
		}

		// Set competition status
		getMixedCompetitionStatus(COMPETITIONS.U19_UEFA_YOUTH_LEAGUE, req.youthLeagueData);
	}

	// U18 Premier League Cup
	if(req.plCupData == null) {
		// Store basic information
		req.plCupData = {
			competitionName: 'U18 Premier League Cup',
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'premier-league-cup'
		};

		// Store group stage standings results
		if(req.plCupTable != null) {
			req.plCupData.competitionTable = req.plCupTable;
			req.plCupData.groupStagePosition = getTeamPosition(req.plCupTable.map(team => team.teamData.teamName));
		}

		// Get relevant fixtures
		if(req.fixtures != null && req.fixtures.length > 0) {
			const plCup_games = req.fixtures.filter(match => match.competition == COMPETITIONS.U18_PREMIER_LEAGUE_CUP).reverse();
			if(plCup_games != null && plCup_games.length > 0) {
				req.plCupData.fixtures = plCup_games;
			}
		}

		// Set competition status
		getMixedCompetitionStatus(COMPETITIONS.U18_PREMIER_LEAGUE_CUP, req.plCupData);
	}

	// FA WSL Continental Tyres Cup
	if(req.faWSLCupData == null) {
		// Store basic information
		req.faWSLCupData = {
			competitionName: 'WOMEN\'S LEAGUE CUP',
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
			competitionName: 'FA CUP',
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
			competitionName: 'CARABAO CUP',
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
			competitionName: 'COMMUNITY SHIELD',
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
			competitionName: 'UEFA SUPER CUP',
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
			competitionName: 'FIFA CLUB WORLD CUP',
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
			competitionName: 'FA YOUTH CUP',
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
			competitionName: 'RUHR CUP',
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
			competitionName: 'OTTEN CUP',
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
			competitionName: 'SPARKASSE & VGH CUP',
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
			competitionName: 'DALLAS CUP',
			competitionLink: ACADEMY_STANDINGS_LOCATION + 'dallas-cup',
			fixtures: dallasCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.DALLAS_CUP, req.dallasCupData);
	}

	// Women FA Cup
	const womenFaCupFixtures = req.fixtures.filter(match => match.competition == COMPETITIONS.WOMEN_FA_CUP).reverse();
	if(womenFaCupFixtures != null && womenFaCupFixtures.length > 0) {
		req.womenFaCupData = {
			competitionName: 'WOMEN\'S FA CUP',
			competitionLink: WOMEN_STANDINGS_LOCATION + 'women-fa-cup',
			fixtures: womenFaCupFixtures
		};

		// Set competition status
		getKnockoutCompetitionStatus(COMPETITIONS.WOMEN_FA_CUP, req.womenFaCupData);
	}
}
