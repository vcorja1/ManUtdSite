// Get Helper Functions
const { getClubData } = require('./clubs');
const { COMPETITIONS, getCompetitionData, getCompetitionRound, getTeamByCompetitionID } = require('./competitions');
const { MATCH_STATUS, RESULTS } = require('./fixtures');

// Store Manchester United name
const MANCHESTER_UNITED_FC = 'Manchester United FC';
const MANCHESTER_UNITED = 'Manchester United';


// Get Team Position From The Table
exports.getTeamPosition = function getTeamPosition(standings) {
	if(standings == null || standings == [])
		return '';

	let position = standings.indexOf(MANCHESTER_UNITED_FC) + 1;
	if(!position || position == 0) {
		position = standings.indexOf(MANCHESTER_UNITED) + 1;
	}
	const suffix = [,'st','nd','rd'][position % 100 >> 3 ^ 1 && position % 10] || 'th';
	return `${position}${suffix}`;
}


// Store Appropriate Color Based On The Table Position
exports.getPositionColorByCompetitionID = function getPositionColorByCompetitionID(competitionID, position) {
	const CHAMPIONS_COLOR = 'rgba(0, 180, 50, 0.5)';
	const QUALIFICATION_COLOR = 'rgba(187, 243, 187, 0.5)';
	const RELEGATION_COLOR = 'rgba(255, 187, 187, 0.5)';
	const GROUP_WINNERS = 'rgba(36, 255, 63, 0.5)';
	const CHAMPIONS_LEAGUE_QUALIFYING_COLOR = 'rgba(187, 243, 255, 0.5)';
	const EUROPA_LEAGUE_COLOR = 'rgba(50, 218, 255, 0.5)';

	switch(competitionID) {
		case COMPETITIONS.PREMIER_LEAGUE:
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			if(position <= 3) {
				return QUALIFICATION_COLOR;
			}
			if(position == 4) {
				return CHAMPIONS_LEAGUE_QUALIFYING_COLOR;
			}
			if(position == 5) {
				return EUROPA_LEAGUE_COLOR;
			}
			if(position >= 18) {
				return RELEGATION_COLOR;
			}
			break;

		case COMPETITIONS.CHAMPIONS_LEAGUE:
			if(position <= 2) {
				return GROUP_WINNERS;
			}
			if(position == 3) {
				return EUROPA_LEAGUE_COLOR;
			}
			break;

		case COMPETITIONS.EUROPA_LEAGUE:
			if(position <= 2) {
				return GROUP_WINNERS;
			}
			break;

		case COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP:
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			break;

		case COMPETITIONS.PREMIER_LEAGUE_2:
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			if(position >= 11) {
				return RELEGATION_COLOR;
			}
			break;

		case COMPETITIONS.PREMIER_LEAGUE_2_DIV_2:
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			if(position <= 5) {
				return QUALIFICATION_COLOR;
			}
			break;

		case COMPETITIONS.PL_INTERNATIONAL_CUP:
			if(position == 1) {
				return GROUP_WINNERS;
			}
			if(position == 2) {
				return CHAMPIONS_LEAGUE_QUALIFYING_COLOR;
			}
			break;

		case COMPETITIONS.UNDER_19_UEFA_YOUTH_LEAGUE:
			if(position == 1) {
				return GROUP_WINNERS;
			}
			if(position == 2) {
				return CHAMPIONS_LEAGUE_QUALIFYING_COLOR;
			}
			break;

		case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			break;

		case COMPETITIONS.U18_PREMIER_LEAGUE_CUP:
			if(position <= 2) {
				return GROUP_WINNERS;
			}
			if(position == 3) {
				return CHAMPIONS_LEAGUE_QUALIFYING_COLOR;
			}
			break;

		case COMPETITIONS.FA_WOMEN_SUPER_LEAGUE:
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			if(position == 2) {
				return QUALIFICATION_COLOR;
			}
			if(position == 10) {
				return RELEGATION_COLOR;
			}

		case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			if(position == 11) {
				return RELEGATION_COLOR;
			}

		case COMPETITIONS.FA_WSL_CUP:
			if(position <= 2) {
				return GROUP_WINNERS;
			}
	}
	return null;
}


// Get Default Table Given Participating Teams
exports.getDefaultTable = function getDefaultTable(teamNames, team, competitionID) {
	let table = [];

	teamNames.forEach(function(teamName, index) {
		table.push({
			teamNameLong: teamName,
			teamData: getClubData(teamName, team, competitionID),
			position: index + 1,
			playedGames: 0,
			wins: 0,
			draws: 0,
			losses: 0,
			goals: 0,
			goalsAgainst: 0,
			goalDifference: 0,
			points: 0
		});
	});

	return table;
}


// Return Stub Fixture
function getStubFixture(team, competitionID) {
	const TBD = 'TBD';
	let stubFixture = {
		matchDate: getMatchDate(TBD),
		hometeam: getClubData(team, competitionID, MANCHESTER_UNITED_FC),
		awayteam: getClubData(team, competitionID, TBD),
		competitionData: getCompetitionData(competitionID)
	};
}

// Update Knockout Competition Status And Add Fixture Stubs If Needed
exports.getKnockoutCompetitionStatus = function getKnockoutCompetitionStatus(competitionID, competitionData) {
	// If the last match has not yet been completed, simply return the round information
	const lastMatch = competitionData.fixtures[0];
	if(lastMatch.status < MATCH_STATUS.FINISHED) {
		competitionData.competitionStatus = lastMatch.roundName;
		return competitionData;
	}

	// Otherwise need to analyze the result of the last match
	const maxRound = getNoNextRound(lastMatch.competition);
	const result = lastMatch.resultData.result;
	if(result == RESULTS.LOSS) {
		competitionData.competitionStatus = (lastMatch.round == maxRound ? 'RUNNERS-UP' : 'OUT');
		return competitionData;
	}

	// Now it is necessary to check whether the competition is won
	if(lastMatch.round >= maxRound) {
		competitionData.competitionStatus = 'CHAMPIONS';
		return competitionData;
	}

	// Now need to add a stub for the future match that has not yet been drawn
	const team = getTeamByCompetitionID(competitionID);
	let stubFixture = getStubFixture(team, competitionID);

	competitionData.competitionStatus = getCompetitionRound(lastMatch.competition, lastMatch.round + 1);
	stubFixture.roundName = competitionData.competitionStatus;

	competitionData.fixtures.unshift(stubFixture);
	return competitionData;
}

// Update Mixed Competition Status And Add Fixture Stubs If Needed
exports.getMixedCompetitionStatus = function getMixedCompetitionStatus(competitionID, competitionData) {
	// TO-DO
	competitionData.competitionStatus = competitionData.groupStagePosition;
	return competitionData;
}
