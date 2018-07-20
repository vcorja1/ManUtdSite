const http = require('http');
// Connect to Heroku database
const { Client } = require('pg');
// To scrape score using Cheerio
const rp = require('request-promise');
const cheerio = require('cheerio');
// Get Fixture Status
const fixtureHelper = require('../helpers/fixtures.js');

// Get fixtures for the given team
function getTeamFixtures(team, req, res, next) {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query(`SELECT * FROM FIXTURES WHERE team='${team}' ORDER BY matchdate;`, (err, resp) => {
		// Handle error
		if (err || !resp) {
			req.loadedData = false;
			res.status(400);
			return next();
		}

		// Save all fixtures
		const dateNow = new Date();
		req.fixtures = JSON.parse(JSON.stringify(resp.rows));
		const fixturesCount = req.fixtures.length;

		req.fixtures.forEach( (match, index) => {
			// Assign an index and prep to get quick info (last and next matches)
			match.id = index;
			match.matchdate = new Date(match.matchdate);
			// Store full team name
			match.hometeamNameShort = fixtureHelper.getTeamShort(match.team, match.competition, match.hometeam);
			match.hometeamNameLong = fixtureHelper.getTeamLong(match.team, match.competition, match.hometeam);
			match.awayteamNameShort = fixtureHelper.getTeamShort(match.team, match.competition, match.awayteam);
			match.awayteamNameLong = fixtureHelper.getTeamLong(match.team, match.competition, match.awayteam);
			// Store competition name and round
			match.competitionName = fixtureHelper.getCompetitionName(match.competition);
			match.roundName = fixtureHelper.getCompetitionRound(match.competition, match.round);
			// Store date short and match time
			match.matchdateShort = fixtureHelper.convertDateShort(match.matchdate);
			match.matchTime = fixtureHelper.convertMatchTime(match.matchdate);
			// Store club and competition logo source
			match.homeClubLogoSrc = fixtureHelper.getClubLogoSrc(match.hometeam);
			match.awayClubLogoSrc = fixtureHelper.getClubLogoSrc(match.awayteam);
			match.competitionLogoSrc = fixtureHelper.getCompetitionLogoSrc(match.competition);
			// Store result string and color (to be used in fixtureMixin.pug)
			match.resultString = fixtureHelper.getResultString(match);
			match.penaltyResultsString = fixtureHelper.getPenaltyResultString(match);
			match.resultColor = fixtureHelper.getResultColor(match);
		});

		// Get last match ID
		const completedMatches = req.fixtures.filter(match => match.status == 5);
		const length = completedMatches.length;
		if(length > 0)
			req.lastMatchID = completedMatches[length - 1].id;

		// Get next match ID
		const nextMatches = req.fixtures.filter(match => match.status < 2);
		if(nextMatches.length > 0)
			req.nextMatchID = nextMatches[0].id;

		// End connection
		client.end();

		// Continue
		return next();
	});
};

// Get fixtures for the reserves team
exports.getFirstTeamFixtures = (req, res, next) => {
	return getTeamFixtures(0, req, res, next);
}

// Get fixtures for the reserves team
exports.getReservesTeamFixtures = (req, res, next) => {
	return getTeamFixtures(1, req, res, next);
};

// Get fixtures for the reserves team
exports.getAcademyTeamFixtures = (req, res, next) => {
	return getTeamFixtures(2, req, res, next);
};


// Get live score, if possible
exports.getLiveScore = (req, res, next) => {
	// Check that there is a next match
	const nextMatchID = req.nextMatchID;
	if(nextMatchID == null) 
		return next();

	if(req.fixtures[nextMatchID].matchid != null) {
		// Ensure that the match has started
		const dateNow = new Date();
		if(dateNow < req.fixtures[nextMatchID].matchdate)
			return next();

		// Get updated score
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

					// Get the match score
					const parsedData = JSON.parse(rawData);

					// Get live scores
					const status = fixtureHelper.convertFixtureStatusToID(parsedData.fixture.status);
					if(status != 2) {
						// Don't record postponed matches, will do this manually
						req.fixtures[nextMatchID].status = status;
					}
					req.fixtures[nextMatchID].homegoals = parsedData.fixture.result.goalsHomeTeam;
					req.fixtures[nextMatchID].awaygoals = parsedData.fixture.result.goalsAwayTeam;

					// If game is completed, note so
					req.lastMatchID = nextMatchID;
					const nextMatches = req.fixtures.filter(match => match.status < 2);
					req.nextMatchID = (nextMatches.length > 0) ? nextMatches[0].id : null;

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
	}
	else if(req.fixtures[nextMatchID].soccerwayurl != null) {
		// Ensure that the match has started
		const dateNow = new Date();
		if(dateNow < req.fixtures[nextMatchID].matchdate)
			return next();

		// Get updated score
		const OPTIONS = {
			uri: `https://us.soccerway.com${req.fixtures[nextMatchID].soccerwayurl}`,
			transform: function (body) {
				return cheerio.load(body);
			}
		};

		rp(OPTIONS)
		.then( ($) => {
			// REQUEST SUCCEEDED: SCRAPE STANDINGS
			let gameTime = $('#page_match_1_block_match_info_4 .game-minute');
			if(gameTime != null && gameTime.length > 0) {
				let liveScore = $('#page_match_1_block_match_info_4 h3.thick.scoretime.score-orange').text().trim();
				req.fixtures[nextMatchID].status = 4;
				req.fixtures[nextMatchID].gameMinute = $(gameTime).text().trim();

				if(liveScore == '-') {
					// TO-DO: Process unavailable result
					req.fixtures[nextMatchID].homegoals = '??';
					req.fixtures[nextMatchID].awaygoals = '??';
				}
				else {
					req.fixtures[nextMatchID].homegoals = parseInt(liveScore.split('-')[0].trim());
					req.fixtures[nextMatchID].awaygoals = parseInt(liveScore.split('-')[1].trim());
					req.fixtures[nextMatchID].resultString = liveScore;
				}
			}
			else {
				let finalScore = $('#page_match_1_block_match_info_4 h3.thick.scoretime').text().trim();
				if(finalScore.includes('-')) {
					req.fixtures[nextMatchID].status = 5;
					req.fixtures[nextMatchID].homegoals = parseInt(finalScore.split('-')[0].trim());
					req.fixtures[nextMatchID].awaygoals = parseInt(finalScore.split('-')[1].trim());
					req.fixtures[nextMatchID].resultString = finalScore;

					// Store result string and color (to be used in fixtureMixin.pug)
					req.fixtures[nextMatchID].penaltyResultsString = fixtureHelper.getPenaltyResultString(req.fixtures[nextMatchID]);
					req.fixtures[nextMatchID].resultColor = fixtureHelper.getResultColor(req.fixtures[nextMatchID]);

					// If game is completed, note so
					req.lastMatchID = nextMatchID;
					const nextMatches = req.fixtures.filter(match => match.status < 2);
					req.nextMatchID = (nextMatches.length > 0) ? nextMatches[0].id : null;
				}
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
	else {
		// Otherwise continue
		return next();
	}
};