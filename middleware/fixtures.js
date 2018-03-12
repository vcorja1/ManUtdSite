const http = require('http');
// Connect to Heroku database
const { Client } = require('pg');
// Get Fixture Status
const fixtureHelper = require('../helpers/fixtures.js');

// Get fixtures for the first team
exports.getFirstTeamFixtures = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query("SELECT * FROM FIXTURES WHERE team='0' ORDER BY matchDate;", (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Save all fixtures
		req.fixtures = JSON.parse(JSON.stringify(resp.rows));
		req.fixtures.forEach(match => match.matchdate = new Date(match.matchdate));

		// Save last match and next match
		const completed = req.fixtures.filter(match => match.status == 5);
		const completedLen = completed.length;
		req.lastMatch = completed[completedLen - 1];

		// If not all matches are completed, get next match
		if(completedLen < req.fixtures.length) {
			req.nextMatch = req.fixtures[completedLen];
		}

		// End connection
		client.end();

		// Continue
		return next();
	});
};

exports.getLiveScore = (req, res, next) => {
	// Check that there is a next match
	if(!req.nextMatch || !req.nextMatch.matchid)
		return next();

	// Ensure that the match has started
	const dateNow = new Date();
	if(dateNow < req.nextMatch.matchdate)
		return next();

	// Get updated score
	const fixtureURL = `http://api.football-data.org/v1/fixtures/${req.nextMatch.matchid}`;

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

				// In case an error occurs, redefine the following
				req.nextMatch = {};
				req.nextMatch.hometeam = parsedData.fixture.homeTeamName;
				req.nextMatch.awayteam = parsedData.fixture.awayTeamName;

				// Now get the live results
				req.nextMatch.status = fixtureHelper.convertFixtureStatusToID(parsedData.fixture.status);
				req.nextMatch.homegoals = fixtureHelper.convertFixtureStatusToID(parsedData.fixture.result.goalsHomeTeam);
				req.nextMatch.awaygoals = fixtureHelper.convertFixtureStatusToID(parsedData.fixture.result.goalsAwayTeam);

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
};