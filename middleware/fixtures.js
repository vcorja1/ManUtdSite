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
	client.query("SELECT * FROM FIXTURES WHERE team='0' ORDER BY matchdate;", (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Save all fixtures
		const dateNow = new Date();
		req.fixtures = JSON.parse(JSON.stringify(resp.rows));
		req.fixtures.forEach( (match, index) => {
			match.id = index;
			match.matchdate = new Date(match.matchdate);
			// Get next match ID
			if(!req.nextMatchID && match.status < 5) // && dateNow < match.matchdate)
				req.nextMatchID = index;
		});

		// Save last match and next match
		if(!req.nextMatchID)
			req.lastMatchID = req.fixtures.length - 1;
		else if(req.nextMatchID > 0)
			req.lastMatchID = req.nextMatchID - 1;

		// End connection
		client.end();

		// Continue
		return next();
	});
};

exports.getLiveScore = (req, res, next) => {
	// Check that there is a next match
	const nextMatchID = req.nextMatchID;
	if(!nextMatchID || !req.fixtures[nextMatchID].matchid)
		return next();

	// Ensure that the match has started
	const dateNow = new Date();
	if(dateNow < req.fixtures[nextMatchID].matchdate)
		return next();
	console.log(dateNow);
	console.log(typeof(dateNow));
	console.log(req.fixtures[nextMatchID].matchdate);
	console.log(typeof(req.fixtures[nextMatchID].matchdate));
	console.log(dateNow < req.fixtures[nextMatchID].matchdate);

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

				// In case an error occurs, redefine the following
				req.fixtures[nextMatchID].hometeam = parsedData.fixture.homeTeamName;
				req.fixtures[nextMatchID].awayteam = parsedData.fixture.awayTeamName;
				req.fixtures[nextMatchID].status = fixtureHelper.convertFixtureStatusToID(parsedData.fixture.status);
				req.fixtures[nextMatchID].homegoals = fixtureHelper.convertFixtureStatusToID(parsedData.fixture.result.goalsHomeTeam);
				req.fixtures[nextMatchID].awaygoals = fixtureHelper.convertFixtureStatusToID(parsedData.fixture.result.goalsAwayTeam);

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