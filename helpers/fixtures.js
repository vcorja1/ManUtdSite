/* -------------------------------------------------------- */
/* ------------------ DATES CONVERSION -------------------- */
/* -------------------------------------------------------- */

// Convert date to short format and to match time
exports.getFormattedMatchDate = function getFormattedMatchDate(date) {
	if(date == null || date == '' || date == 'TBD')
		return {
			date: 'TBD',
			dateTime: 'TBD',
			matchTime: 'TBD',
			shortWeekDateTime: 'TBD',
			weekDateTime: 'TBD'
		};

	matchDate = new Date(date);

	// Check if this is a special case
	let today = new Date();
	const yesterday = new Date((today.setDate(today.getDate() - 1)));
	const tomorrow = new Date((today.setDate(today.getDate() + 1)));
	const matchDateCopy = new Date(date);

	let specialDay = (today.setHours(0,0,0,0) == matchDateCopy.setHours(0,0,0,0)) ? 'Today' : null;
	if(specialDay == null) {
		specialDay = (yesterday.setHours(0,0,0,0) == matchDateCopy.setHours(0,0,0,0)) ? 'Yesterday' : null;
		if(specialDay == null) {
			specialDay = (tomorrow.setHours(0,0,0,0) == matchDateCopy.setHours(0,0,0,0)) ? 'Tomorrow' : null;
		}
	}

	return {
		date: matchDate,
		matchTime: matchDate.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true }),
		dateTime: specialDay || matchDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
		shortWeekDateTime: specialDay || matchDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', 'weekday': 'short' }),
		weekDateTime: specialDay || matchDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', 'weekday': 'long' })
	};
}


/* -------------------------------------------------------- */
/* ---------------------- RESULTS ------------------------- */
/* -------------------------------------------------------- */

// Store fixture statuses
const MATCH_STATUS = {
	SCHEDULED: 0,
	IN_PLAY: 1,
	PAUSED: 2,
	SUSPENDED: 3,
	POSTPONED: 4,
	CANCELED: 5,
	FINISHED: 6,
	AWARDED: 7
};
Object.freeze(MATCH_STATUS);
exports.MATCH_STATUS = MATCH_STATUS;

// Store fixture names
const MATCH_STATUS_NAMES = [
	'SCHEDULED', 'IN_PLAY', 'PAUSED', 'SUSPENDED', 'POSTPONED', 'CANCELED', 'FINISHED', 'AWARDED'
];
Object.freeze(MATCH_STATUS_NAMES);
exports.MATCH_STATUS_NAMES = MATCH_STATUS_NAMES;


/* -------------------------------------------------------- */
/* ---------------------- RESULTS ------------------------- */
/* -------------------------------------------------------- */

const MATCH_RESULT = {
	WIN: 0,
	DRAW: 1,
	LOSS: 2
};
Object.freeze(MATCH_RESULT);
exports.MATCH_RESULT = MATCH_RESULT;



exports.getLiveScoreResult = function getLiveScoreResult(homeGoals, awayGoals, penaltyResult) {
	const BLUE = '#009CDE';

	const homePens = (penaltyResult != null ? penaltyResult.split('-')[0].trim() : null);
	const awayPens = (penaltyResult != null ? penaltyResult.split('-')[1].trim() : null);

	return {
		homeGoals: homeGoals,
		awayGoals: awayGoals,
		resultString: homeGoals + ' - ' + awayGoals,
		homePens: homePens,
		awayPens: awayPens,
		penaltyString: penaltyResult,
		penaltyResultString: (penaltyResult != null ? `(${homePens}) ${homeGoals} - ${awayGoals} (${awayPens})` : null),
		resultColor: BLUE
	};
}

exports.getResultData = function getResultData(homeTeam, homeGoals, awayGoals, penaltyResult) {
	// Define constants
	const MANCHESTER_UNITED_FC = 'Manchester United FC';
	const MANCHESTER_UNITED = 'Manchester United';
	const GREEN = '#00cc00', GRAY = '#97999B', RED = '#D50032';

	// Check if Manchester United is the home team
	const isManUtdHome = (homeTeam == MANCHESTER_UNITED_FC || homeTeam == MANCHESTER_UNITED);

	// Helper variable
	let result;

	// Analyze score if there was a penalty shootout
	if(penaltyResult != null) {
		const homePens = penaltyResult.split('-')[0].trim();
		const awayPens = penaltyResult.split('-')[1].trim();

		// Check result
		if(homePens > awayPens) {
			// Home Team Won the Shootout
			result = isManUtdHome ? MATCH_RESULT.WIN : MATCH_RESULT.LOSS;
		}
		else {
			// Away Team Won the Shootout
			result = isManUtdHome ? MATCH_RESULT.LOSS : MATCH_RESULT.WIN;
		}

		let penaltyMessage = 'Manchester United' + (isManUtdHome ? ' loses ' : ' wins ') + (isManUtdHome ? penaltyResult : awayPens + ' - ' + homePens) + ' on penalty kicks.';

		return {
			homeGoals: homeGoals,
			awayGoals: awayGoals,
			resultString: homeGoals + ' - ' + awayGoals,
			homePens: homePens,
			awayPens: awayPens,
			penaltyString: penaltyResult,
			penaltyResultString: `(${homePens}) ${homeGoals} - ${awayGoals} (${awayPens})`,
			penaltyMessage: penaltyMessage,
			result: result,
			resultColor: result == MATCH_RESULT.WIN ? GREEN : RED
		};
	}

	// If same score, DRAW
	if(homeGoals == awayGoals) {
		return {
			homeGoals: homeGoals,
			awayGoals: awayGoals,
			resultString: homeGoals + ' - ' + awayGoals,
			result: MATCH_RESULT.DRAW,
			resultColor: GRAY
		};
	}

	// Home Team Won
	if(homeGoals > awayGoals) {
		result = isManUtdHome ? MATCH_RESULT.WIN : MATCH_RESULT.LOSS;
	}
	// Away Team Won
	else {
		result = isManUtdHome ? MATCH_RESULT.LOSS : MATCH_RESULT.WIN;
	}

	return {
		homeGoals: homeGoals,
		awayGoals: awayGoals,
		resultString: homeGoals + ' - ' + awayGoals,
		result: result,
		resultColor: result == MATCH_RESULT.WIN ? GREEN : RED
	};
}
