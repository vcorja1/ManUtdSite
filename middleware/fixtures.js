const http = require('http');
// Connect to Heroku database
const { Client } = require('pg');
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
		// Handle error1
		if (err) {
			res.status(400);
		}

		// Save all fixtures
		const dateNow = new Date();
		req.fixtures = JSON.parse(JSON.stringify(resp.rows));
		const fixturesCount = req.fixtures.length;

		// Assign an index and prep to get quick info (last and next matches)
		req.fixtures.forEach( (match, index) => {
			match.id = index;
			match.matchdate = new Date(match.matchdate);
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
	return getTeamFixtures(1, req,res,next);
};

// Get fixtures for the reserves team
exports.getAcademyTeamFixtures = (req, res, next) => {
	return getTeamFixtures(2, req,res,next);
};


// Get live score, if possible
exports.getLiveScore = (req, res, next) => {
	// Check that there is a next match
	const nextMatchID = req.nextMatchID;
	if(!nextMatchID || !req.fixtures[nextMatchID].matchid)
		return next();

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
};