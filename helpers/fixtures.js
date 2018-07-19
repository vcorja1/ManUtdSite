// Store Manchester United name
const MANCHESTER_UNITED_FC = 'Manchester United FC';
const MANCHESTER_UNITED = 'Manchester United';

/* -------------------------------------------------------- */
/* ------------------- FIXTURE STATUS --------------------- */
/* -------------------------------------------------------- */

// Returns the status for the given fixture
exports.getFixtureStatus = function getFixtureStatus(status) {
	const fixtureStatus = [
		'SCHEDULED', 'TIMED', 'POSTPONED', 'CANCELED', 'IN_PLAY', 'FINISHED'
	];

	return fixtureStatus[status];
}

// Returns the status for the given fixture
exports.convertFixtureStatusToID = function convertFixtureStatusToID(status) {
	if(status == null)
		return status;

	const fixtureStatus = [
		'SCHEDULED', 'TIMED', 'POSTPONED', 'CANCELED', 'IN_PLAY', 'FINISHED'
	];

	return fixtureStatus.indexOf(status);
}

/* -------------------------------------------------------- */
/* ----------------- COMPETITION DETAILS ------------------ */
/* -------------------------------------------------------- */

// Returns the name of the competition based on the ID
exports.getCompetitionName = function getCompetitionName(competitionID) {
	const competitions = [
		'Premier League', 'FA Cup', 'Carabao Cup', 'Community Shield', 'Champions League', 'Europa League',
		'UEFA Super Cup', 'FIFA Club World Cup', 'International Champions Cup', 'Friendly', 'Premier League 2',
		'PL International Cup', 'Under-19 UEFA Youth League', 'U18 Premier League North',
		'U18 Premier League Cup', 'FA Youth Cup', 'Otten Cup', 'Sparkasse & VGH Cup', 'Dallas Cup'
	];

	return competitions[competitionID];
}

// Get the team by competition ID
exports.getTeamByCompetitionID = function getTeamByCompetitionID(competitionID) {
	// Return friendlies as first team
	if(competitionID < 10) {
		return 0;
	}
	if(competitionID < 13) {
		return 1;
	}
	return 2;
}

// Returns the name of the competition round based on the ID
exports.getCompetitionRound = function getCompetitionRound(competitionID, round) {
	switch(competitionID) {
		case 0: 	// Premier League
		case 10: 	// Premier League 2
			return 'Week ' + round;
		case 13: 	// Under-18 Premier League North
			return round === 23 ? 'Final' : ('Week ' + round);
		case 3: 	// Community Shield
		case 6: 	// UEFA Super Cup
			return 'Final';
		case 7: 	// FIFA Club World Cup
			return round === 1 ? '1/2 Finals' : (round === 2 ? '3rd Place' : 'Final');
		case 8: 	// International Champions Cup
			return round === 4 ? 'Final' : 'Game ' + round;
		case 9: 	// Friendlies
			return 'FR';
	}

	// FA Cup, or FA Youth Cup
	if(competitionID == 1 || competitionID == 15) {
		if(round <=  5)
			return 'Rd ' + round;
		if(round == 6)
			return '1/4 Finals';
		if(round == 7)
			return '1/2 Finals';
		return 'Final';
	}

	// Carabao (EFL) Cup
	if(competitionID == 2) {
		if(round <= 5)
			return 'Rd ' + round;
		if(round == 6)
			return '1/2 Finals';
		return 'Final';
	}

	// Champions League
	if(competitionID == 4) {
		if(round <= 6)
			return 'Game ' + round;
		if(round <= 8)
			return '1/8 Finals';
		if(round <= 10)
			return '1/4 Finals';
		if(round <= 12)
			return '1/2 Finals';
		return 'Final';
	}

	// Europa League
	if(competitionID == 5) {
		if(round <= 6)
			return 'Game ' + round;
		if(round <= 8)
			return '1/16 Finals';
		if(round <= 10)
			return '1/8 Finals';
		if(round <= 12)
			return '1/4 Finals';
		if(round <= 14)
			return '1/2 Finals';
		return 'Final';
	}

	// Premier League International Cup, or Under-18 Premier League Cup
	if(competitionID == 11 || competitionID == 14) {
		if(round <= 3)
			return 'Game ' + round;
		if(round == 4)
			return '1/4 Finals';
		if(round == 5)
			return '1/2 Finals';
		return 'Final';
	}

	// Under-19 UEFA Youth League
	if(competitionID == 12) {
		if(round <= 6)
			return 'Game ' + round;
		if(round <= 8)
			return 'Qualif. ' + (round - 6);
		if(round == 9)
			return 'Playoff';
		if(round == 10)
			return '1/8 Finals';
		if(round == 11)
			return '1/4 Finals';
		if(round == 12)
			return '1/2 Finals';
		return 'Final';
	}

	// Otten Cup
	if(competitionID == 16) {
		if(round <= 3)
			return 'Game ' + round;
		if(round == 4)
			return '7th/8th Place';
		if(round == 5)
			return '5th/6th Place';
		if(round == 6)
			return '3rd/4th Place';
		return 'Final';
	}

	// 5-a-side Sparkasse & VGH Cup
	if(competitionID == 17) {
		if(round <= 8)
			return 'Game ' + round;
		if(round == 9)
			return '1/4 Finals';
		if(round == 10)
			return '1/2 Finals';
		return 'Final';
	}

	// Dallas Cup
	if(competitionID == 18) {
		if(round <= 3)
			return 'Game ' + round;
		if(round == 4)
			return '1/2 Finals';
		return 'Final';
	}

	return 'Rd ' + round;
}

// Returns the maximum round number based on the competition
function getMaxRound(competitionID) {
	switch(competitionID) {
		case 0: 		// Premier League
			return 38;
		case 1: 		// FA Cup
		case 15: 		// FA Youth Cup
			return 8;
		case 2: 		// Carabao (EFL) Cup
		case 16: 		// Otten Cup
			return 7;
		case 3: 		// Community Shield
		case 6: 		// UEFA Super Cup
			return 1;
		case 4: 		// Champions League
			return 14;
		case 5: 		// Europa League
			return 16;
		case 7: 		// FIFA Club World Cup
			return 3;
		case 8: 		// International Champions Cup
			return 4;
		case 10: 		// Premier League 2
		case 13: 		// U18 Premier League North
			return 22;
		case 11: 		// Premier League International Cup
		case 14: 		// Under-18 Premier League Cup
			return 6;
		case 12: 		// Under-19 UEFA Youth League
			return 13;
		case 17: 		// 5-a-side Sparkasse & VGH Cup
			return 11;
		case 18: 		// Dallas Cup
			return 5;
		default:
			return -1;
	}
}

// Returns the competition logo based on the ID
exports.getCompetitionLogoSrc = function getCompetitionLogoSrc(competitionID) {
	const LOGOS_FOLDER = '/img/competitionLogos/';
	switch(competitionID) {
		case 0:
			return LOGOS_FOLDER + 'epl.png';
		case 1:
			return LOGOS_FOLDER + 'fa.png';
		case 2:
			return LOGOS_FOLDER + 'carabao.jpg';
		case 4:
			return LOGOS_FOLDER + 'ucl.png';
		case 6:
			return LOGOS_FOLDER + 'super_cup.png';
		case 8:
			return LOGOS_FOLDER + 'icc.png';
		case 10:
			return LOGOS_FOLDER + 'pl2.jpg';
		case 11:
			return LOGOS_FOLDER + 'plic.png';
		case 12:
			return LOGOS_FOLDER + 'uefa_youth_league.png';
		case 13:
			return LOGOS_FOLDER + 'u18_pl.jpg';
		case 14:
			return LOGOS_FOLDER + 'u18_pl_cup.jpg';
		case 15:
			return LOGOS_FOLDER + 'fa_youth_cup.png';
		case 16:
			return LOGOS_FOLDER + 'otten_cup.png';
		case 17:
			return LOGOS_FOLDER + 'vgh_cup.png';
		case 18:
			return LOGOS_FOLDER + 'dallas_cup.png';
	}
}

/* -------------------------------------------------------- */
/* --------------------- TEAM NAMES ----------------------- */
/* -------------------------------------------------------- */

// Removes tags like 'FC' from the name
function removeTeamNameAbbr(teamName) {
	// Keep some names as they are
	if (teamName === 'Toronto FC') {
		return teamName;
	}

	// Otherwise remove ending
	const ending = teamName.substr(-3);
	if(ending === ' FC' || ending === ' CF')
		return teamName.slice(0, -3);
	if(teamName.substr(-4) === ' AFC')
		return teamName.slice(0, -4);

	// Or remove beginning
	var start = teamName.substr(0,3);
	if(start === 'UC ' || start === 'SL ' || start === 'FC ' || start === 'FK ' || start === 'AS ' || start === 'KV ' || start === 'SV ')
		return teamName.substr(3);
	start = teamName.substr(0,4);
	if(start === 'AFC ' || start === 'RSC ')
		return teamName.substr(4);

	// Special cases below
	if(teamName === 'Valerenga Fotball')
		return 'Valerenga';
	if(teamName === '1.FSV Mainz 05')
		return 'Mainz 05';

	return teamName;
}

// Gets the proper team ending
function getTeamNameEnding(team, competition) {
	if(team === 1)
		return competition === 12 ? ' U19' : ' U23';
	if(team === 2)
		return ' U18';
	return '';
}

// Get Short Team Name
exports.getTeamShort = function getTeamShort(team, competition, teamName) {
	// First shorten to a long name
	teamName = removeTeamNameAbbr(teamName);

	// Now see if any further adjustments are necessary
	switch(teamName) {
		// Premier League
		case 'Manchester United':
			teamName = 'Man Utd';
			break;
		case 'Brighton & Hove Albion':
			teamName = 'Brighton';
			break;
		case 'Cardiff City':
			teamName = 'Cardiff';
			break;
		case 'Huddersfield Town':
			teamName = 'Huddersfield';
			break;
		case 'Leicester City':
			teamName = 'Leicester';
			break;
		case 'Manchester City':
			teamName = 'Man City';
			break;
		case 'Newcastle United':
			teamName = 'Newcastle';
			break;
		case 'Tottenham Hotspur':
			teamName = 'Tottenham';
			break;
		case 'West Ham United':
			teamName = 'West Ham';
			break;
		case 'Wolverhampton Wanderers':
			teamName = 'Wolves';
			break;

		// England
		case 'Blackburn Rovers':
			teamName = 'Blackburn';
			break;
		case 'Burton Albion':
			teamName = 'Burton';
			break;
		case 'Derby County':
			teamName = 'Derby';
			break;
		case 'Stoke City':
			teamName = 'Stoke';
			break;
		case 'Swansea City':
			teamName = 'Swansea';
			break;
		case 'West Bromwich Albion':
			teamName = 'West Brom';
			break;
		case 'Yeovil Town':
			teamName = 'Yeovil';
			break;
		// Spain
		case 'Atletico Madrid':
			teamName = 'Atletico';
			break;
		// Germany
		case 'Bayern Munich':
			teamName = 'Bayern';
			break;
		case 'Borussia Monchengladbach':
			teamName = 'Gladbach';
			break;
		case 'Eintracht Braunschweig':
			teamName = 'BTSV';
			break;
		// Italy
		case 'Inter Milan':
			teamName = 'Inter';
			break;
		// France
		case 'Olympique Lyonnais':
			teamName = 'Lyon';
			break;
		case 'Paris Saint-Germain':
			teamName = 'PSG';
			break;
		case 'PSV Eindhoven':
			teamName = 'PSV';
			break;
	}

	return teamName + getTeamNameEnding(team, competition);
}

// Get Long Team Name
exports.getTeamLong = function getTeamLong(team, competition, teamName) {
	return removeTeamNameAbbr(teamName) + getTeamNameEnding(team, competition);
}

/* -------------------------------------------------------- */
/* --------------------- TEAM LOGOS ----------------------- */
/* -------------------------------------------------------- */

// Convert date to short format
exports.getClubLogoSrc = function getClubLogoSrc(teamName) {
	const CLUB_LOGOS_FOLDER = '/img/clubLogos/';
	teamName = this.getTeamLong(0, 0, teamName);
	switch(teamName) {
		case MANCHESTER_UNITED:
			return CLUB_LOGOS_FOLDER + 'Manchester_United.svg';
		// Premier League
		case 'Arsenal':
		case 'Bournemouth':
		case 'Brighton & Hove Albion':
		case 'Burnley':
		case 'Cardiff City':
		case 'Chelsea':
		case 'Crystal Palace':
		case 'Everton':
		case 'Fulham':
		case 'Huddersfield Town':
		case 'Leicester City':
		case 'Liverpool':
		case 'Manchester City':
		case 'Newcastle United':
		case 'Southampton':
		case 'Tottenham Hotspur':
		case 'Watford':
		case 'West Ham United':
		case 'Wolverhampton Wanderers':
		// England
		case 'Blackburn Rovers':
		case 'Coventry City':
		case 'Northampton Town':
		case 'Sheffield United':
		case 'Stoke City':
		case 'Swansea City':
		case 'West Bromwich Albion':
		// Spain
		case 'Atletico Madrid':
		case 'Barcelona':
		case 'Sevilla':
		case 'Valencia':
		// Germany
		case 'Bayern Munich':
		case 'Borussia Dortmund':
		// Italy
		case 'AC Milan':
		case 'Inter Milan':
		case 'Juventus':
		case 'Roma':
		// France
		case 'Olympique Lyonnais':
		case 'Paris Saint-Germain':
		// Netherlands
		case 'Ajax':
		case 'PSV Eindhoven':
		// Portugal
		case 'Benfica':
		// Czech Republic
		case 'Vysocina Jihlava':
		// Austria
		case 'Ried':
		// United States
		case 'Club America':
		case 'San Jose Earthquakes':
			return CLUB_LOGOS_FOLDER + teamName.replace(/ /g, '_') + '.svg';
		// Use PNG files for the following club logos
		// England
		case 'Bradford City':
		case 'Derby County':
		// Spain
		case 'Real Madrid':
		// Portugal
		case 'Porto':
		// Belgium
		case 'Oostende':
		// Ukraine
		case 'Shakhtar Donetsk':
			return CLUB_LOGOS_FOLDER + teamName.replace(/ /g, '_') + '.png';
		// Otherwise return the default crest
		default:
			return CLUB_LOGOS_FOLDER + 'defaultCrest.png';
	}
}

/* -------------------------------------------------------- */
/* ---------------------- RESULTS ------------------------- */
/* -------------------------------------------------------- */

const WIN = 0, DRAW = 1, LOSS = 2;

function getMatchResult(matchData) {
	// If same score, return DRAW, unless there was a penalty shootout
	if(matchData.homegoals == matchData.awaygoals) {
		if(matchData.note == null)
			return DRAW;
		// Otherwise, analyze the shootout
		if(matchData.note.split("-")[0] > matchData.note.split("-")[1])
			// Home Team Won the Shootout
			return matchData.hometeam == MANCHESTER_UNITED_FC ? WIN : LOSS;
		// Away Team Won the Shootout
		return matchData.awayteam == MANCHESTER_UNITED_FC ? WIN : LOSS;
	}
	// Home Team Won
	if(matchData.homegoals > matchData.awaygoals)
		return matchData.hometeam == MANCHESTER_UNITED_FC ? WIN : LOSS;
	// Away Team Won
	return matchData.awayteam == MANCHESTER_UNITED_FC ? WIN : LOSS;
}

// Convert result to string
exports.getResultString = function getResultString(matchData) {
	// If no penalty shootout, just return result
	if(matchData.note == null)
		return matchData.homegoals + ' - ' + matchData.awaygoals;
	// Otherwise return with penalties result
	return '(' + matchData.note.split("-")[0] + ') '
			+ matchData.homegoals + ' - ' + matchData.awaygoals
			+ ' (' + matchData.note.split("-")[1] + ')';
}

// Get penalty result string
exports.getPenaltyResultString = function getResultString(matchData) {
	if(matchData.note == null) {
		return;
	}

	// Get penalty results
	const homePens = matchData.note.split("-")[0];
	const awayPens = matchData.note.split("-")[1];
	const isManUtdHome = matchData.hometeam == MANCHESTER_UNITED_FC;
	if(homePens > awayPens)
		return 'Manchester United' + (isManUtdHome ? ' wins ' : ' loses ') +
			(isManUtdHome ? matchData.note : awayPens + '-' + homePens) + ' on penalty kicks.';
	// Otherwise, Manchester United is the away team
	return 'Manchester United' + (isManUtdHome ? ' loses ' : ' wins ') +
		(isManUtdHome ? matchData.note : awayPens + '-' + homePens) + ' on penalty kicks.';
}

// Get color based on result
exports.getResultColor = function getResultColor(matchData) {
	const GREEN = '#00cc00';
	const GRAY = '#97999B';
	const RED = '#D50032';

	// Get result
	const result = getMatchResult(matchData);

	// Return appropriate color
	if(result == WIN) {
		return GREEN;
	}
	return result == DRAW ? GRAY : RED;
}

/* -------------------------------------------------------- */
/* ----------------- STANDINGS STATUS --------------------- */
/* -------------------------------------------------------- */

// Get team position from the table
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

// Update status and add fixture stubs if needed
exports.getCompetitionStatus = function getCompetitionStatus(competitionID, competitionData) {
	// Get the team by competition
	const team = this.getTeamByCompetitionID(competitionID);
	// Create a stub fixture data to be used later
	const TBD = 'TBD';
	let stubFixture = {
		matchdate: TBD,
		hometeam: MANCHESTER_UNITED_FC,
		awayteam: TBD,
		// Store full team name
		hometeamNameShort: this.getTeamShort(team, competitionID, MANCHESTER_UNITED_FC),
		hometeamNameLong: this.getTeamLong(team, competitionID, MANCHESTER_UNITED_FC),
		awayteamNameShort: TBD,
		awayteamNameLong: TBD,
		// Store competition name and round
		competitionName: this.getCompetitionName(competitionID),
		// Store date short and match time
		matchdateShort: TBD,
		matchTime: TBD,
		// Store club and competition logo source
		homeClubLogoSrc: this.getClubLogoSrc(MANCHESTER_UNITED_FC),
		awayClubLogoSrc: this.getClubLogoSrc(TBD),
		competitionLogoSrc: this.getCompetitionLogoSrc(competitionID)
	};

	// Mixed competitions have to be treated separately if they aren't in knockout stage yet
	if(competitionID == 4 || competitionID == 5) {
		// Champions League & Europa League -> Check if group stage isn't yet completed
		if(competitionData.competitionTable[0].playedGames < 6) {
			return competitionData.groupStagePosition;
		}
		// Otherwise analyze position in the table
		const position = competitionData.competitionTable.indexOf(MANCHESTER_UNITED_FC) + 1;
		if(position > 2) {
			return (competitionID == 4 && position == 3) ? 'EUROPA LEAGUE' : 'OUT';
		}
		// In this case, reached the knockout stages
		if(competitionData.fixtures == null || competitionData.fixtures.length == 0) {
			// If no fixtures yet, add a stub
			competitionData.competitionStatus = this.getCompetitionRound(competitionID, 7);
			stubFixture.competitionStatus = competitionData.competitionStatus;
			competitionData.fixtures = [];
			competitionData.fixtures.push(stubFixture);
			return competitionData;
		}
	}

	// If the last match has not yet been completed, simply return the round information
	const lastMatch = competitionData.fixtures[0];
	if(lastMatch.status < 5) {
		competitionData.competitionStatus = lastMatch.roundName;
		return competitionData;
	}
	// Otherwise need to analyze the result of the last match
	const maxRound = getMaxRound(lastMatch.competition);
	const result = getMatchResult(lastMatch);
	if(result == LOSS) {
		competitionData.competitionStatus = (lastMatch.round == maxRound ? 'RUNNERS-UP' : 'OUT');
		return competitionData;
	}
	// Now it is necessary to check whether the competition is won
	if(lastMatch.round >= maxRound) {
		competitionData.competitionStatus = 'CHAMPIONS';
		return competitionData;
	}
	// In special cases there might be no more next game (i.e. 5th/6th place)
	if((competitionID == 7 && lastMatch.round == 2) || (competitionID == 16 && lastMatch.round >= 4)) {
		competitionData.competitionStatus = lastMatch.roundName;
		return competitionData;
	}
	// Now need to add a stub for the future match that has not yet been drawn
	competitionData.competitionStatus = this.getCompetitionRound(lastMatch.competition, lastMatch.round + 1);
	stubFixture.roundName = competitionData.competitionStatus;
	competitionData.fixtures.unshift(stubFixture);
	return competitionData;
}

// Store Appropriate Color Based On The Table Position
exports.getPositionColorByCompetitionID = function getPositionColorByCompetitionID(competitionID, position) {
	const CHAMPIONS_COLOR = 'rgba(0, 180, 50, 0.5)';
	const CHAMPIONS_LEAGUE_GROUP_COLOR = 'rgba(50, 218, 255, 0.5)';
	const CHAMPIONS_LEAGUE_QUALIFYING_COLOR = 'rgba(187, 243, 255, 0.5)';
	const EUROPA_LEAGUE_COLOR = 'rgba(187, 243, 187, 0.5)';
	const RELEGATION_COLOR = 'rgba(255, 187, 187, 0.5)';
	const UCL_GROUP_WINNERS = 'rgba(36, 255, 63, 0.5)';

	switch(competitionID) {
		case 0: 	// Premier League
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			if(position <= 3) {
				return CHAMPIONS_LEAGUE_GROUP_COLOR;
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
		case 4: 	// Champions League
			if(position <= 2) {
				return UCL_GROUP_WINNERS;
			}
			if(position == 3) {
				return CHAMPIONS_LEAGUE_QUALIFYING_COLOR;
			}
			break;
		case 5: 	// Europa League
			if(position <= 2) {
				return UCL_GROUP_WINNERS;
			}
			break;
		case 8: 	// International Champions Cup
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			break;
		case 10: 	// Premier League 2
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			if(position >= 11) {
				return RELEGATION_COLOR;
			}
			break;
		case 11: 	// Premier League International Cup
			if(position == 1) {
				return UCL_GROUP_WINNERS;
			}
			if(position == 2) {
				return CHAMPIONS_LEAGUE_QUALIFYING_COLOR;
			}
			break;
		case 12: 	// Under-19 UEFA Youth League
			if(position == 1) {
				return UCL_GROUP_WINNERS;
			}
			if(position == 2) {
				return CHAMPIONS_LEAGUE_QUALIFYING_COLOR;
			}
			break;
		case 13: 	// U18 Premier League North
			if(position == 1) {
				return CHAMPIONS_COLOR;
			}
			break;
		case 15: 	// U18 Premier League Cup
			if(position <= 2) {
				return UCL_GROUP_WINNERS;
			}
			if(position == 3) {
				return CHAMPIONS_LEAGUE_QUALIFYING_COLOR;
			}
			break;
	}
	return null;
}

/* -------------------------------------------------------- */
/* ------------------ DATES CONVERSION -------------------- */
/* -------------------------------------------------------- */

// Convert date to short format
exports.convertDateShort = function convertDateShort(date) {
	if(date === '')
		return 'TBD';

	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	return date.toLocaleDateString("en-US", options);
}

// Convert date to match time
exports.convertMatchTime = function convertMatchTime(date) {
	if(date === '')
		return 'TBD';

	const options = { hour: 'numeric', minute: '2-digit', hour12: true };
	return date.toLocaleTimeString("en-US", options);
}
