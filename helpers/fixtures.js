/* -------------------------------------------------------- */
/* ------------------- FIXTURE STATUS --------------------- */
/* -------------------------------------------------------- */

exports.getTeamPosition = function getTeamPosition(standings) {
	const position = standings.indexOf('Manchester United FC') + 1;
	const suffix = [,'st','nd','rd'][position % 100 >> 3 ^ 1 && position % 10] || 'th';
	return `${position}${suffix}`;
}

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

// Returns the name of the competition round based on the ID
exports.getCompetitionRound = function getCompetitionRound(competitionID, round) {
	switch(competitionID) {
		case 0: 	// Premier League
		case 10: 	// Premier League 2
		case 13: 	// Under-18 Premier League North
			return 'Week ' + round;
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
		if(round < 6)
			return 'Rd ' + round;
		if(round == 6)
			return '1/4 Finals';
		if(round == 7)
			return '1/2 Finals';
		return 'Final';
	}

	// Carabao (EFL) Cup
	if(competitionID == 2) {
		if(round < 6)
			return 'Rd ' + round;
		if(round == 6)
			return '1/2 Finals';
		return 'Final';
	}

	// Champions League
	if(competitionID == 4) {
		if(round < 7)
			return 'Game ' + round;
		if(round < 9)
			return '1/8 Finals';
		if(round < 11)
			return '1/4 Finals';
		if(round < 13)
			return '1/2 Finals';
		return 'Final';
	}

	// Europa League
	if(competitionID == 5) {
		if(round < 7)
			return 'Game ' + round;
		if(round < 9)
			return '1/16 Finals';
		if(round < 11)
			return '1/8 Finals';
		if(round < 13)
			return '1/4 Finals';
		if(round < 15)
			return '1/2 Finals';
		return 'Final';
	}

	// Premier League International Cup, or Under-18 Premier League Cup
	if(competitionID == 11 || competitionID == 14) {
		if(round < 3)
			return 'Game ' + round;
		if(round == 4)
			return '1/4 Finals';
		if(round == 5)
			return '1/2 Finals';
		return 'Final';
	}

	// Under-19 UEFA Youth League
	if(competitionID == 12) {
		if(round < 7)
			return 'Game ' + round;
		if(round < 9)
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
		if(round < 4)
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
		if(round < 9)
			return 'Game ' + round;
		if(round == 9)
			return '1/4 Finals';
		if(round == 10)
			return '1/2 Finals';
		return 'Final';
	}

	// Dallas Cup
	if(competitionID == 18) {
		if(round < 3)
			return 'Game ' + round;
		if(round == 3)
			return '1/2 Finals';
		return 'Final';
	}

	return 'Rd ' + round;
}

// Returns the competition logo based on the ID
exports.getCompetitionLogo = function getCompetitionLogo(competitionID) {
	switch(competitionID) {
		case 0:
			return '/img/logos/epl.png';
		case 1:
			return '/img/logos/fa.png';
		case 2:
			return '/img/logos/carabao.jpg';
		case 4:
			return '/img/logos/ucl.png';
		case 6:
			return '/img/logos/super_cup.png';
		case 8:
			return '/img/logos/icc.png';
		case 10:
			return '/img/logos/pl2.jpg';
		case 11:
			return '/img/logos/plic.png';
		case 12:
			return '/img/logos/uefa_youth_league.png';
		case 13:
			return '/img/logos/u18_pl.jpg';
		case 14:
			return '/img/logos/u18_pl_cup.jpg';
		case 15:
			return '/img/logos/fa_youth_cup.png';
		case 16:
			return '/img/logos/otten_cup.png';
		case 17:
			return '/img/logos/vgh_cup.png';
		case 18:
			return '/img/logos/dallas_cup.png';
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
	if(start === 'UC ' || start === 'SL ' || start === 'FC ' || start === 'FK ')
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
		case 'Manchester United':
			teamName = 'Man Utd';
			break;
		case 'Brighton & Hove Albion':
			teamName = 'Brighton';
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
		case 'Stoke City':
			teamName = 'Stoke';
			break;
		case 'Swansea City':
			teamName = 'Swansea';
			break;
		case 'Tottenham Hotspur':
			teamName = 'Tottenham';
			break;
		case 'West Bromwich Albion':
			teamName = 'West Brom';
			break;
		case 'West Ham United':
			teamName = 'West Ham';
			break;

		case 'Burton Albion':
			teamName = 'Burton';
			break;
		case 'Derby County':
			teamName = 'Derby';
			break;
		case 'Yeovil Town':
			teamName = 'Yeovil';
			break;
		case 'Athletic Club':
			teamName = 'Athletic';
			break;
		case 'Wolverhampton Wanderers':
			teamName = 'Wolves';
			break;
		case 'Blackburn Rovers':
			teamName = 'Blackburn';
			break;
		case 'Borussia Monchengladbach':
			teamName = 'Gladbach';
			break;
		case 'Eintracht Braunschweig':
			teamName = 'BTSV';
			break;
	}

	return teamName + getTeamNameEnding(team, competition);
}

// Get Long Team Name
exports.getTeamLong = function getTeamLong(team, competition, teamName) {
	return removeTeamNameAbbr(teamName) + getTeamNameEnding(team, competition);
}

/* -------------------------------------------------------- */
/* ---------------------- RESULTS ------------------------- */
/* -------------------------------------------------------- */

// Get color based on result
exports.getResultColor = function getResultColor(matchData) {
	// If draw, return gray
	if(matchData.homegoals == matchData.awaygoals)
		return '#97999B';
	// If win, return green
	if(matchData.homegoals > matchData.awaygoals)
		return matchData.hometeam == 'Manchester United FC' ? '#00cc00' : '#D50032';
	// If loss, return red
	return matchData.awayteam == 'Manchester United FC' ? '#00cc00' : '#D50032';
}

/* -------------------------------------------------------- */
/* ------------------ DATES CONVERSION -------------------- */
/* -------------------------------------------------------- */

// Convert date to short format
exports.convertDateShort = function convertDateShort(date) {
	if(date === '')
		return 'TBD';

	const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
	return date.toLocaleDateString("en-US", options);
}

// Convert date to match time
exports.convertMatchTime = function convertMatchTime(date) {
	if(date === '')
		return 'TBD';

	const options = { hour: 'numeric', minute: '2-digit', hour12: true };
	return date.toLocaleTimeString("en-US", options);
}
