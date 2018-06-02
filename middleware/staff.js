// Connect to Heroku database
const { Client } = require('pg');
// Get Staff Title
const staffHelper = require('../helpers/staff.js');
// Get Country Name
const { byAlpha2 } = require('iso-country-codes');

// Flag image location
const FLAG_IMG_FOLDER = 'img/flags/';

function getFullCountryName(member) {
	if(member.country == 'UK') {
		member.countryName = 'England';
		member.flagImg = FLAG_IMG_FOLDER + 'england.svg';
	}
	else if(member.country == '01') {
		member.countryName = 'Northern Ireland';
		member.flagImg = FLAG_IMG_FOLDER + 'northern_ireland.svg';
	}
	else if(member.country == '02') {
		member.countryName = 'Scotland';
		member.flagImg = FLAG_IMG_FOLDER + 'scotland.svg';
	}
	else if(member.country == '03') {
		member.countryName = 'Wales';
		member.flagImg = FLAG_IMG_FOLDER + 'wales.svg';
	}
	else if(member.country == 'KR') {
		member.countryName = 'South Korea';
		member.flagImg = FLAG_IMG_FOLDER + 'kr.svg';
	}
	else if(member.country == 'VE') {
		member.countryName = 'Venezuela';
		member.flagImg = FLAG_IMG_FOLDER + 've.svg';
	}
	else if(member.country in byAlpha2) {
		member.countryName = byAlpha2[member.country].name;
		member.flagImg = FLAG_IMG_FOLDER + member.country.toLowerCase() + '.svg';

		if(member.countryName.endsWith(' (the)')) {
			member.countryName = member.countryName.slice(0, -6);
		}
	}
}

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
			member.job_title = staffHelper.getTeamPrefix(member.team) + staffHelper.getStaffTitle(member.title);

			// Get the full country name
			getFullCountryName(member);

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
			getFullCountryName(member);
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
			getFullCountryName(member);
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
			getFullCountryName(member);
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
			getFullCountryName(member);
		});

		// End connection
		client.end();

		// Continue
		return next();
	});
};
