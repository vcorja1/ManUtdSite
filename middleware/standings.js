const http = require('http');
// Connect to Heroku database
const { Client } = require('pg');

const eplTableURL = 'http://api.football-data.org/v1/competitions/445/leagueTable';

// Get the Premier League Standings
exports.getEPLTable = (req, res, next) => {
	http.get(eplTableURL, (resp) => {
		const { statusCode } = resp;
		const contentType = resp.headers['content-type'];

		if (statusCode !== 200 || !/^application\/json/.test(contentType)) {
			// Consume response data to free up memory
			resp.resume();

			// Handle error here
			// TO-DO: Redirect to error page
			next();
		}

		resp.setEncoding('utf8');
		let rawData = '';
		resp.on('data', (chunk) => { rawData += chunk; });
		resp.on('end', () => {
			try {
				// Get the EPL Table Standings
				const parsedData = JSON.parse(rawData);
				req.epl = parsedData.standing;
				req.epl.forEach(function(team) {
					if(team.position < 4) {
						team.color = 'rgba(51, 218, 255, 0.5)';
					}
					else if(team.position == 4) {
						team.color = 'rgba(187, 243, 255, 0.5)';
					}
					if(team.position == 5) {
						team.color = 'rgba(187, 243, 187, 0.5)';
					}
					else if(team.position > 17) {
						team.color = 'rgba(255, 187, 187, 0.5)';
					}
				});
				// Continue
				next();
			} catch (e) {
				// Handle error here
				// TO-DO: Redirect to error page
				next(e);
			}
		});
	}).on('error', (e) => {
		// Handle error here
		// TO-DO: Redirect to error page
		next(e);
	});
};

// Get the Champions League standings
exports.getUCLTable = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query("SELECT * FROM STANDINGS WHERE id='ucl';", (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Save relevant Data
		req.ucl = resp.rows[0];
		req.ucl = JSON.parse(req.ucl.data);
		req.ucl.standing.forEach(function(team) {
			if(team.position < 3) {
				team.color = 'rgba(30, 240, 30, 0.5)';
			}
			else if(team.position == 3) {
				team.color = 'rgba(187, 243, 255, 0.5)';
			}
		});

		// End connection
		client.end();

		// Continue
		next();
	});
};