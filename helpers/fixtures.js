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
		'Premier League International Cup', 'Under-19 UEFA Youth League', 'Under-18 Premier League North',
		'Under-18 Premier League Cup', 'FA Youth Cup'
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
			return 'Qualif. ' + (round - 7);
		if(round == 9)
			return 'Playoff';
		if(round == 10)
			return '1/8 Finals';
		if(round == 11)
			return '1/4 Finals';
		if(round = 12)
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
		default:
			return '';
	}
}

/* -------------------------------------------------------- */
/* --------------------- TEAM NAMES ----------------------- */
/* -------------------------------------------------------- */

// Get Short Team Name
exports.getTeamShort = function getTeamShort(team) {
	// First shorten to a long name
	team = this.getTeamLong(team);

	// Now see if any further adjustments are necessary
	switch(team) {
		case 'Manchester United':
			return 'Man Utd';
		case 'Brighton & Hove Albion':
			return 'Brighton';
		case 'Huddersfield Town':
			return 'Huddersfield';
		case 'Leicester City':
			return 'Leicester';
		case 'Manchester City':
			return 'Man City';
		case 'Newcastle United':
			return 'Newcastle';
		case 'Stoke City':
			return 'Stoke';
		case 'Swansea City':
			return 'Swansea';
		case 'Tottenham Hotspur':
			return 'Tottenham';
		case 'West Bromwich Albion':
			return 'West Brom';
		case 'West Ham United':
			return 'West Ham';

		case 'Burton Albion':
			return 'Burton';
		case 'Derby County':
			return 'Derby';
		case 'Yeovil Town':
			return 'Yeovil';

		default:
			return team;
	}
}

// Get Long Team Name
exports.getTeamLong = function getTeamLong(team) {
	if(team.substr(-3) === ' FC')
		return team.slice(0, -3);
	if(team.substr(0,4) === 'AFC ')
		return team.substr(4);
	// Special cases below
	const substr = team.substr(0,3);
	if(substr === 'UC ' || substr === 'SL ')
		return team.substr(3);
	if(team === 'Valerenga Fotball')
		return 'Valerenga';
	return team;
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
