// Get Country Name
const { byAlpha2 } = require('iso-country-codes');

// Flag image location
const FLAG_IMG_FOLDER = 'img/flags/';

// Returns the job title for the corresponding ID
exports.getStaffTitle = function getStaffTitle(titleID) {
	const staffTitles = [
		'Owner', 'Honorary President', 'Co-Chairman', 'Executive Vice Chairman', 'Director', 'Chief Financial Officer', 'Club Secretary', 'Club Ambassador',
		'Manager', 'Assistant Manager', 'Coach', 'Goalkeeping Coach', 'Fitness Coach', 'Tactical Analyst', 'Head of First-Team Development',
		'Director of Youth Academy', 'Academy Operations Manager', 'Head of Academy Coaching', 'Academy Consultant',
		'Head of Academy Recruitment', 'Assistant Head of Academy Recruitment', 'Player Recruitment',
		'Chief Scout', 'Head of Global Scouting', 'Head of European Scouting', 'Scouting Manager', 'Scout', 
		'Head of Sports Science', 'Club Doctor', 'Physiotherapist', 'Sports Scientist',
		'Masseur', 'Club Dietician', 'Head of Performance', 'Head of Strength and Conditioning', 'Head of Human Performance',
		'Director of Group Operations', 'Director of Communications', 'Director of Legal and Business Affairs', 'Director of Finance and IT',
		'Director of Partnerships', 'CEO of Media', 'Equality and Inclusion Manager',
		'Director of Venue', 'Stadium Manager', 'Grounds Manager', 'Head of Stadium Safety and Security', 'Safety Officer',
		'Ticket office manager', 'Programme Editor'
	 ];

	return staffTitles[titleID];
}


// Gets the proper team ending
exports.getTeamPrefix = function getTeamPrefix(team) {
	if(team === 1)
		return 'U23 ';
	if(team === 2)
		return 'U18 ';
	if(team === 3)
		return 'U16 ';
	if(team === 4)
		return 'U14 ';
	if(team === 5)
		return 'U12 ';
	if(team === 6)
		return 'U10 ';
	if(team === 7)
		return 'U9 ';
	return '';
}

// Store the full country name and its flag location
exports.getFullCountryName = function getFullCountryName(member) {
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
