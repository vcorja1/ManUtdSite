// Connect to Heroku database
const { Client } = require('pg');

// Get Staff helper functions
const staffHelper = require('../helpers/staff.js');

exports.getCoachingStaff = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query('SELECT * FROM STAFF WHERE TITLE > 7 AND TITLE < 22 ORDER BY TITLE, TEAM;', (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Initialize staff arrays
		req.staffData = [];
		req.academyData = [];

		// Save relevant Data
		const allStaff = JSON.parse(JSON.stringify(resp.rows));
		allStaff.forEach((member) => {
			// Get the full job title
			if(member.title < 15 || member.title == 21) {
				member.job_title = staffHelper.getTeamPrefix(member.team) + staffHelper.getStaffTitle(member.title);
			}
			else {
				member.job_title = staffHelper.getStaffTitle(member.title);
			}

			// Get the full country name
			staffHelper.getFullCountryName(member);

			// Place it into an appropriate list
			if(member.title < 15 && member.team == 0) {
				req.staffData.push(member);
			}
			else {
				req.academyData.push(member);
			}
		});

		// Sort academy staff list differently
		req.academyData.sort(function(a,b) {
			return a.team - b.team || a.title - b.title;
		});

		// End connection
		client.end();

		// Continue
		return next();
	});
};

exports.getBoardMembers = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query('SELECT * FROM STAFF WHERE TITLE < 8 ORDER BY TITLE, TEAM;', (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Save relevant Data
		req.boardData = JSON.parse(JSON.stringify(resp.rows));
		req.boardData.forEach((member) => {
			// Get the full job title
			member.job_title = staffHelper.getTeamPrefix(member.team) + staffHelper.getStaffTitle(member.title);

			// Get the full country name
			staffHelper.getFullCountryName(member);
		});

		// End connection
		client.end();

		// Continue
		return next();
	});
};

exports.getMedicalTeam = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query('SELECT * FROM STAFF WHERE TITLE > 26 AND TITLE < 36 ORDER BY TITLE, TEAM;', (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Save relevant Data
		req.medicalData = JSON.parse(JSON.stringify(resp.rows));
		req.medicalData.forEach((member) => {
			// Get the full job title
			if(member.note != null) {
				member.job_title = staffHelper.getTeamPrefix(member.team) + member.note;
			}
			else {
				member.job_title = staffHelper.getTeamPrefix(member.team) + staffHelper.getStaffTitle(member.title);
			}

			// Get the full country name
			staffHelper.getFullCountryName(member);
		});

		// End connection
		client.end();

		// Continue
		return next();
	});
};

exports.getScoutingTeam = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query('SELECT * FROM STAFF WHERE TITLE > 21 AND TITLE < 27 ORDER BY TITLE, TEAM;', (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Save relevant Data
		req.scoutData = JSON.parse(JSON.stringify(resp.rows));
		req.scoutData.forEach((member) => {
			// Get the full job title
			member.job_title = staffHelper.getTeamPrefix(member.team) + staffHelper.getStaffTitle(member.title);

			// Get the full country name
			staffHelper.getFullCountryName(member);
		});

		// End connection
		client.end();

		// Continue
		return next();
	});
};

exports.getClubStaff = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query('SELECT * FROM STAFF WHERE TITLE > 35 ORDER BY TITLE, TEAM;', (err, resp) => {
		// Handle error
		if (err) {
			res.status(400);
		}

		// Save relevant Data
		req.clubStaffData = JSON.parse(JSON.stringify(resp.rows));
		req.clubStaffData.forEach((member) => {
			// Get the full job title
			member.job_title = staffHelper.getTeamPrefix(member.team) + staffHelper.getStaffTitle(member.title);

			// Get the full country name
			staffHelper.getFullCountryName(member);
		});

		// End connection
		client.end();

		// Continue
		return next();
	});
};
