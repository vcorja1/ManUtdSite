// Get Helper Functions
const { getClubData } = require('./clubs');
const {
	COMPETITIONS,
	getCompetitionName,
	getCompetitionRoundName,
	getCompetitionLogoSrc,
	getTeamByCompetitionID,
	getCompetitionDetails
} = require('./competitions');
const { MATCH_STATUS, MATCH_RESULT, getFormattedMatchDate } = require('./fixtures');

// Store Manchester United name
const MANCHESTER_UNITED_FC = 'Manchester United FC';
const MANCHESTER_UNITED = 'Manchester United';


// Get Team Position From The Table
function getTeamPosition(standings) {
	if(standings == null || standings == []) {
		return '';
	}

	let position = standings.indexOf(MANCHESTER_UNITED_FC) + 1;
	if(!position || position == 0) {
		position = standings.indexOf(MANCHESTER_UNITED) + 1;
	}
	const suffix = ['','st','nd','rd'][position % 100 >> 3 ^ 1 && position % 10] || 'th';
	return `${position}${suffix}`;
}

exports.getTeamPosition = (standings) => getTeamPosition(standings);


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

		case COMPETITIONS.EFL_TROPHY:
			if(position <= 2) {
				return GROUP_WINNERS;
			}
			break;

		case COMPETITIONS.U19_UEFA_YOUTH_LEAGUE:
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
			if(position == 1) {
				return GROUP_WINNERS;
			}
			if(position == 2) {
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
			if(position == 12) {
				return RELEGATION_COLOR;
			}
			break;

		case COMPETITIONS.FA_WOMEN_SUPER_LEAGUE:
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			if(position == 11) {
				return RELEGATION_COLOR;
			}
			break;

		case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			if(position == 11) {
				return RELEGATION_COLOR;
			}
			break;

		case COMPETITIONS.FA_WSL_CUP:
			if(position <= 2) {
				return GROUP_WINNERS;
			}
			break;
	}
	return null;
};


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
};


// Return Stub Fixture
function getStubFixture(team, competitionID, round) {
	return {
		matchDate: getFormattedMatchDate('TBD'),
		homeTeam: getClubData(MANCHESTER_UNITED_FC, team, competitionID),
		awayTeam: getClubData('TBD', team, competitionID),
		competitionName: getCompetitionName(competitionID),
		roundName: getCompetitionRoundName(competitionID, round),
		competitionLogoSrc: getCompetitionLogoSrc(competitionID)
	};
}


// Update Table Competition Status
exports.getTableCompetitionStatus = function getTableCompetitionStatus(competitionID, competitionData) {
	// Get competition details
	const competitionDetails = getCompetitionDetails(competitionID);

	// Get MUFC's table position
	const table = competitionData.competitionTable.map(team => team.teamData.teamName);
	let tablePosition = table.indexOf(MANCHESTER_UNITED_FC) + 1;
	if(!tablePosition || tablePosition == 0) {
		tablePosition = table.indexOf(MANCHESTER_UNITED) + 1;
	}

	competitionData.competitionEnded = competitionData.competitionTable.filter(team => team.playedGames != competitionDetails.finalRound).length == 0;
	if(competitionData.competitionEnded) {
		if(tablePosition == 1) {
			competitionData.competitionStatus = 'CHAMPIONS';
		}
		else if(competitionDetails.relegationPlace != null && tablePosition >= competitionDetails.relegationPlace) {
			competitionData.competitionStatus = 'RELEGATED';
		}
		else {
			competitionData.competitionStatus = getTeamPosition(table);
		}
	}
	else {
		competitionData.competitionStatus = getTeamPosition(table);
	}
	return competitionData;
};

// Update Mixed Competition Status And Add Fixture Stubs If Needed
exports.getMixedCompetitionStatus = function getMixedCompetitionStatus(competitionID, competitionData) {
	// Get competition details
	const competitionDetails = getCompetitionDetails(competitionID);

	// Filter out fixtures appropriately
	let lastMatch, qualificationMatches, playoffMatches, isGroupStage = true;
	if(competitionData.fixtures != null && competitionData.fixtures.length > 0) {
		competitionData.fixtures.sort((a, b) => b.round - a.round);
		lastMatch = competitionData.fixtures[0];
		qualificationMatches = competitionData.fixtures.filter(match => match.round < competitionDetails.groupStageMin);
		playoffMatches = competitionData.fixtures.filter(match => match.round > competitionDetails.groupStageMax);
		isGroupStage = lastMatch.round >= competitionDetails.groupStageMin && lastMatch.round <= competitionDetails.groupStageMax;
	}

	// Save fixtures
	delete competitionData["fixtures"];
	if(qualificationMatches != null && qualificationMatches.length > 0) {
		competitionData.qualificationMatches = qualificationMatches;
	}
	if(playoffMatches != null && playoffMatches.length > 0) {
		competitionData.playoffMatches = playoffMatches;
	}

	// If no matches have been played yet, then return default status
	if(lastMatch == null) {
		competitionData.competitionStatus = competitionData.groupStagePosition;
		competitionData.competitionEnded = false;
		return competitionData;
	}

	// If the last match has not yet been completed, simply return the round information
	if(lastMatch.status < MATCH_STATUS.FINISHED) {
		competitionData.competitionStatus = (isGroupStage ? competitionData.groupStagePosition : lastMatch.roundName);
		competitionData.competitionEnded = false;
		return competitionData;
	}

	if(!isGroupStage) {
		// For playoffs, check special cases
		const isPlayoffs = lastMatch.round > competitionDetails.groupStageMax;
		if(isPlayoffs) {
			// Playoffs
			if(competitionDetails.isSingleRoundElim) {
				return getKnockoutCompetitionStatus(competitionID, competitionData, true);
			}

			// Otherwise need to check if this is the final
			if(lastMatch.round >= competitionDetails.finalRound) {
				competitionData.competitionStatus = (lastMatch.result.result === MATCH_RESULT.WIN ? 'CHAMPIONS' : 'RUNNERS-UP');
				competitionData.competitionEnded = true;
				return competitionData;
			}
		}

		// Get two leg result
		getTwoLegResult(lastMatch, competitionData, playoffMatches);

		// Process competition status if it isn't over
		if(competitionData.competitionEnded) {
			competitionData.competitionStatus = 'OUT';
		}
		else {
			if(!isPlayoffs && competitionDetails.groupStageMin === lastMatch.round + 1) {
				// Qualified to the group stage
				competitionData.competitionStatus = 'GROUP STAGE';
			}
			else {
				// Need to add a stub for the future match that has not yet been drawn
				const team = getTeamByCompetitionID(competitionID);
				let stubFixture = getStubFixture(team, competitionID, lastMatch.round + 1);
				if(isPlayoffs) {
					competitionData.playoffMatches.unshift(stubFixture);
				}
				else {
					competitionData.qualificationMatches.unshift(stubFixture);
				}

				competitionData.competitionStatus = stubFixture.roundName;
			}
		}

		return competitionData;
	}

	// Otherwise, this is the group stage, get MUFC's table position
	if(competitionData.competitionTable != null) {
		const table = competitionData.competitionTable.map(team => team.teamData.teamName);
		let tablePosition = table.indexOf(MANCHESTER_UNITED_FC) + 1;
		if(!tablePosition || tablePosition == 0) {
			tablePosition = table.indexOf(MANCHESTER_UNITED) + 1;
		}

		// If the group stage is over, check if qualified to the next round
		if(lastMatch.round === competitionDetails.groupStageMax) {
			if(competitionID == COMPETITIONS.U19_UEFA_YOUTH_LEAGUE && tablePosition == 1) {
				// Special case -> UEFA Youth League
				const team = getTeamByCompetitionID(competitionID);
				let stubFixture = getStubFixture(team, competitionID, lastMatch.round + 2);
				competitionData.playoffMatches = [stubFixture];

				competitionData.competitionStatus = stubFixture.roundName;
				competitionData.competitionEnded = false;
			}
			else if(tablePosition <= competitionDetails.groupStageAdvance) {
				// Need to add a stub for the future match that has not yet been drawn
				const team = getTeamByCompetitionID(competitionID);
				let stubFixture = getStubFixture(team, competitionID, lastMatch.round + 1);
				competitionData.playoffMatches = [stubFixture];

				competitionData.competitionStatus = stubFixture.roundName;
				competitionData.competitionEnded = false;
			}
			else if(competitionID == COMPETITIONS.CHAMPIONS_LEAGUE && tablePosition == 3) {
				// Special case -> Champions League
				competitionData.competitionStatus = 'TRANSFER TO EUROPA LEAGUE';
				competitionData.competitionEnded = true;
			}
			else {
				competitionData.competitionStatus = 'OUT';
				competitionData.competitionEnded = true;
			}
		}
		return competitionData;
	}

	// Return group stage position
	competitionData.competitionStatus = competitionData.groupStagePosition;
	competitionData.competitionEnded = false;
	return competitionData;
};

// Update Knockout Competition Status And Add Fixture Stubs If Needed
const getKnockoutCompetitionStatus = exports.getKnockoutCompetitionStatus = function (competitionID, competitionData, isMixedCompetition = false) {
	const matches = isMixedCompetition ? competitionData.playoffMatches : competitionData.fixtures;

	// If the last match has not yet been completed, simply return the round information
	const lastMatch = matches[0];
	if(lastMatch.status < MATCH_STATUS.FINISHED) {
		competitionData.competitionStatus = lastMatch.roundName;
		competitionData.competitionEnded = false;
		return competitionData;
	}

	// Otherwise need to analyze the result of the last match
	const competitionDetails = getCompetitionDetails(competitionID);
	if(competitionID == COMPETITIONS.CARABAO_CUP && lastMatch.round == 7) {
		// Carabao Cup semifinals are played over 2 legs
		getTwoLegResult(lastMatch, competitionDetails, matches);
	}
	else if(matches.length > 1 && lastMatch.round === matches[1].round) {
		// Replay of the same round
		getTwoLegResult(lastMatch, competitionDetails, matches);
	}
	else {
		const result = lastMatch.result.result;
		if(result == MATCH_RESULT.LOSS) {
			if(lastMatch.round >= competitionDetails.finalRound) {
				competitionData.competitionStatus = 'RUNNERS-UP';
			}
			else if(competitionDetails.finalRound != competitionDetails.noNextRound) {
				competitionData.competitionStatus = isMixedCompetition ? lastMatch.roundName : lastMatch.roundName.split('/')[1];
			}
			else {
				competitionData.competitionStatus = 'OUT';
			}
			competitionData.competitionEnded = true;
			return competitionData;
		}
	}

	// Now it is necessary to check whether the competition is won or over
	if(lastMatch.round >= competitionDetails.finalRound) {
		competitionData.competitionStatus = 'CHAMPIONS';
		competitionData.competitionEnded = true;
		return competitionData;
	}
	else if(lastMatch.round >= competitionDetails.noNextRound) {
		competitionData.competitionStatus = lastMatch.roundName.split('/')[0] + ' Place';
		competitionData.competitionEnded = true;
		return competitionData;
	}

	// Now need to add a stub for the future match that has not yet been drawn
	const team = getTeamByCompetitionID(competitionID);
	let stubFixture = getStubFixture(team, competitionID, lastMatch.round + 1);
	matches.unshift(stubFixture);

	competitionData.competitionStatus = stubFixture.roundName;
	competitionData.competitionEnded = false;
	return competitionData;
};

function getTwoLegResult(lastMatch, competitionData, playoffMatches) {
	// Process result -> First check if the two-match tie ended in penalties 
	if(lastMatch.result.homePens != null) {
		if(lastMatch.result.homePens > lastMatch.result.awayPens) {
			competitionData.competitionEnded = (lastMatch.awayTeam.teamName === MANCHESTER_UNITED_FC);
		}
		else {
			competitionData.competitionEnded = (lastMatch.homeTeam.teamName === MANCHESTER_UNITED_FC);
		}
	}

	// If didn't go to penalties, need to process the two last games
	if(competitionData.competitionEnded == null) {
		let prevMatch = playoffMatches[1];
		const team1 = lastMatch.result.homeGoals + prevMatch.result.awayGoals;
		const team2 = lastMatch.result.awayGoals + prevMatch.result.homeGoals;

		if(team1 > team2) {
			competitionData.competitionEnded = (lastMatch.awayTeam.teamName === MANCHESTER_UNITED_FC);
		}
		else if(team2 < team1) {
			competitionData.competitionEnded = (lastMatch.homeTeam.teamName === MANCHESTER_UNITED_FC);
		}
		else {
			// Away-goal rule
			if(prevMatch.result.awayGoals > lastMatch.result.awayGoals) {
				competitionData.competitionEnded = (lastMatch.awayTeam.teamName === MANCHESTER_UNITED_FC);
			}
			else {
				competitionData.competitionEnded = (lastMatch.homeTeam.teamName === MANCHESTER_UNITED_FC);
			}
		}
	}
}