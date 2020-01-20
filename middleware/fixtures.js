// Connect to Heroku database
const { Client } = require('pg');
// To get live score
const http = require('http');
// To scrape score using Cheerio
const rp = require('request-promise');
const cheerio = require('cheerio');

// Get Helper Functions
const { TEAMS } = require('../helpers/teams');
const { getClubData } = require('../helpers/clubs');
const { COMPETITIONS, getCompetitionName, getCompetitionRoundName, getCompetitionLogoSrc } = require('../helpers/competitions');
const {
	MATCH_STATUS,
	MATCH_STATUS_NAMES,
	getFormattedMatchDate,
	getResultData,
	getLiveScoreResult
} = require('../helpers/fixtures');



// Get fixtures for the reserves team
exports.getFirstTeamFixtures = (req, res, next) => {
	return getTeamFixtures(TEAMS.SENIOR, '', req, res, next);
};
exports.getFirstTeamCupFixtures = (req, res, next) => {
	const cupConditional = ` AND competition >= ${COMPETITIONS.FA_CUP} AND competition <= ${COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP}`;
	return getTeamFixtures(TEAMS.SENIOR, cupConditional, req, res, next);
};

// Get fixtures for the reserves team
exports.getReservesTeamFixtures = (req, res, next) => {
	return getTeamFixtures(TEAMS.RESERVES, '', req, res, next);
};
exports.getReservesTeamCupFixtures = (req, res, next) => {
	const cupConditional = ` AND competition >= ${COMPETITIONS.PL_INTERNATIONAL_CUP} AND competition <= ${COMPETITIONS.U19_UEFA_YOUTH_LEAGUE}`;
	return getTeamFixtures(TEAMS.RESERVES, cupConditional, req, res, next);
};

// Get fixtures for the academy team
exports.getAcademyTeamFixtures = (req, res, next) => {
	return getTeamFixtures(TEAMS.ACADEMY, '', req, res, next);
};
exports.getAcademyTeamCupFixtures = (req, res, next) => {
	const cupConditional = ` AND competition >= ${COMPETITIONS.U18_PREMIER_LEAGUE_CUP} AND competition <= ${COMPETITIONS.ICGT_TOURNAMENT}`;
	return getTeamFixtures(TEAMS.ACADEMY, cupConditional, req, res, next);
};

// Get fixtures for the academy team
exports.getWomenTeamFixtures = (req, res, next) => {
	return getTeamFixtures(TEAMS.WOMEN, '', req, res, next);
};
exports.getWomenTeamCupFixtures = (req, res, next) => {
	const cupConditional = ` AND competition >= ${COMPETITIONS.WOMEN_FA_CUP} AND competition <= ${COMPETITIONS.FA_WSL_CUP}`;
	return getTeamFixtures(TEAMS.WOMEN, cupConditional, req, res, next);
};




// Get fixtures for the given team
function getTeamFixtures(team, cupConditional, req, res, next) {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get All Fixtures
	client.query(`SELECT * FROM FIXTURES WHERE team=($1) ORDER BY matchdate;`, [`${team}${cupConditional}`], (err, resp) => {
		// Handle error
		if (err || !resp) {
			req.loadedData = false;
			res.status(400);
			return next();
		}

		// Save all fixtures
		req.fixtures = JSON.parse(JSON.stringify(resp.rows));

		// Store match status object, for reference
		req.MATCH_STATUS = MATCH_STATUS;

		req.fixtures.forEach( (match, index) => {
			// Assign an index and prep to get quick info (last and next matches)
			match.id = index;

			// Get match date info
			match.matchDate = getFormattedMatchDate(match.matchdate);

			// Store team data
			match.homeTeam = getClubData(match.hometeam, match.team, match.competition);
			match.awayTeam = getClubData(match.awayteam, match.team, match.competition);

			// Store competition data
			match.competitionName = getCompetitionName(match.competition);
			match.roundName = getCompetitionRoundName(match.competition, match.round);
			match.competitionLogoSrc = getCompetitionLogoSrc(match.competition);

			// Store result data
			if(match.status >= MATCH_STATUS.FINISHED) {
				match.result = getResultData(match.hometeam, match.homegoals, match.awaygoals, match.note);
			}
		});

		// Get last match ID
		const completedMatches = req.fixtures.filter(match => match.status >= MATCH_STATUS.SUSPENDED);
		const length = completedMatches.length;
		if(length > 0) {
			req.lastMatchID = completedMatches[length - 1].id;
		}

		// Get next match ID
		const nextMatches = req.fixtures.filter(match => match.status <= MATCH_STATUS.PAUSED);
		if(nextMatches.length > 0) {
			req.nextMatchID = nextMatches[0].id;
		}

		// End connection
		client.end();


		// ---------------------------- Get live score for the next match, if possible ----------------------------

		// Check that there is a next match
		if(req.nextMatchID != null) {
			// Check that the next match has begun
			const date = req.fixtures[req.nextMatchID].matchDate.date;
			if(date != null && date != 'TBD' && (new Date()) >= date) {

				// Scrape soccerway
				if(req.fixtures[req.nextMatchID].soccerwayurl != null) {
					return getLiveScoreSoccerway(req, res, next);
				}
				// Get score from football-data
				else if(req.fixtures[req.nextMatchID].matchid != null) {
					return getLiveScoreFootballData(req, res, next);
				}

			}
		}

		// Continue
		return next();
	});
}

// Get live score from football-data
function getLiveScoreFootballData(req, res, next) {
	const nextMatchID = req.nextMatchID;
	const fixtureURL = `http://api.football-data.org/v1/fixtures/${req.fixtures[nextMatchID].matchid}`;

	http.get(fixtureURL, (resp) => {
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
				// Get the next match details
				let nextMatch = req.fixtures[nextMatchID];

				// Get the data
				const parsedData = JSON.parse(rawData);

				// Get live scores
				const status = MATCH_STATUS_NAMES.indexOf(parsedData.fixture.status);
				nextMatch.status = status;

				// Process score, if applicable
				if(status == MATCH_STATUS.LIVE || status == MATCH_STATUS.PAUSED || status >= MATCH_STATUS.FINISHED) {
					nextMatch.result = getResultData(nextMatch.hometeam, nextMatch.homegoals, nextMatch.awaygoals, nextMatch.note);
				}

				// If the game is over, note so
				if(status >= MATCH_STATUS.SUSPENDED) {
					req.lastMatchID = nextMatchID;
					const nextMatches = req.fixtures.filter(match => match.status == MATCH_STATUS.SCHEDULED);
					req.nextMatchID = (nextMatches.length > 0) ? nextMatches[0].id : null;
				}

				// Update match details in the database
				updateMatch(nextMatch);

				// Continue
				return next();

			}
			catch (e) {
				// Handle error here
				return next(e);
			}
		});
	}).on('error', (e) => {
		// Handle error here
		return next(e);
	});
}

// Get live score from soccerway
function getLiveScoreSoccerway(req, res, next) {
	let nextMatch = req.fixtures[req.nextMatchID];
	const utcDate = nextMatch.matchdate;
	const matchDate = utcDate.substr(0, 4) + '/' + utcDate.substr(5, 2) + '/' + utcDate.substr(8, 2);

	// Get updated score
	const OPTIONS = {
		uri: `https://us.soccerway.com/matches/${matchDate}${nextMatch.soccerwayurl}`,
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	rp(OPTIONS)
	.then( ($) => {
		// REQUEST SUCCEEDED: SCRAPE STANDINGS
		let gameTime = $('.game-minute');

		if(gameTime != null && gameTime.length > 0) {
			// Game is live
			nextMatch.status = MATCH_STATUS.IN_PLAY;

			let liveScore = $('h3.thick.scoretime.score-orange').text().trim();
			if(liveScore == '-') {
				nextMatch.result = getLiveScoreResult('??', '??', null);
			}
			else {
				const homegoals = parseInt(liveScore.split('-')[0].trim());
				const awaygoals = parseInt(liveScore.split('-')[1].trim());
				nextMatch.result = getLiveScoreResult(homegoals, awaygoals, null);
			}

			// Save the match minute
			nextMatch.result.gameMinute = $(gameTime).text().trim();
		}
		else {
			let finalScore = $('h3.thick.scoretime').text().trim();
			if(finalScore === '') {
				// Game is postponed
				nextMatch.status = MATCH_STATUS.POSTPONED;

				// Since the game is completed, note so
				req.lastMatchID = req.nextMatchID;
				const nextMatches = req.fixtures.filter(match => match.status == MATCH_STATUS.SCHEDULED);
				req.nextMatchID = (nextMatches.length > 0) ? nextMatches[0].id : null;
			}
			else if(finalScore === 'Suspended' || finalScore === 'Cancelled') {
				// Game is either suspended or cancelled
				nextMatch.status = (finalScore === 'Suspended' ? MATCH_STATUS.SUSPENDED : MATCH_STATUS.CANCELED);

				// Since the game is completed, note so
				req.lastMatchID = req.nextMatchID;
				const nextMatches = req.fixtures.filter(match => match.status == MATCH_STATUS.SCHEDULED);
				req.nextMatchID = (nextMatches.length > 0) ? nextMatches[0].id : null;
			}
			else if(finalScore.includes('-')) {
				// Game is completed
				nextMatch.status = MATCH_STATUS.FINISHED;

				// Check for penalties
				if(finalScore.includes('P')) {
					// Penalty shoot-out
					finalScore = finalScore.replace(/P/g, '');

					try {
						let soccerwayScoreDetails = $('.container.middle dt:contains("Penalties")');
						nextMatch.note = soccerwayScoreDetails.next().text().trim();

					}
					catch(err) {
						console.error(`ERROR! Soccerway penalty result not obtained for team '${nextMatch.team}' and date '${nextMatch.matchdate}'. (Competition = '${nextMatch.competition}' and round = '${nextMatch.round}')`);
						console.error(err);
					}
				}
				else if(finalScore.includes('E')) {
					// Extra time
					finalScore = finalScore.replace(/E/g, '');
				}

				// Store result data
				nextMatch.homegoals = parseInt(finalScore.split('-')[0].trim());
				nextMatch.awaygoals = parseInt(finalScore.split('-')[1].trim());
				nextMatch.result = getResultData(nextMatch.hometeam, nextMatch.homegoals, nextMatch.awaygoals, nextMatch.note);

				// Since the game is completed, note so
				req.lastMatchID = req.nextMatchID;
				const nextMatches = req.fixtures.filter(match => match.status == MATCH_STATUS.SCHEDULED);
				req.nextMatchID = (nextMatches.length > 0) ? nextMatches[0].id : null;
			}
		}

		// Update match details in the database
		updateMatch(nextMatch);

		// Continue
		return next();

	})
	.catch(function () {
		// REQUEST FAILED: IGNORE THIS REQUEST
		console.error(`ERROR! Soccerway match not found for team '${nextMatch.team}' and date '${nextMatch.matchdate}'. (Competition = '${nextMatch.competition}' and round = '${nextMatch.round}')`);
		return next();
	});
}


// Update match details in the database
function updateMatch(updateMatchDetails) {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get All Fixtures
	client.query(`UPDATE FIXTURES SET status = ($1), homeGoals = ($2), awayGoals = ($3) WHERE (matchDate=($4) AND team = ($5));`, [updateMatchDetails.status, updateMatchDetails.homegoals, updateMatchDetails.awaygoals, updateMatchDetails.matchdate, updateMatchDetails.team], (err, resp) => {
		if(err || !resp) {
			console.error(`ERROR: Error while updating match details in database`, err);
		}
		else {
			console.log(`Successfully updated match details for team = ${updateMatchDetails.team} played on ${updateMatchDetails.matchdate}.`);
		}
	});
}
