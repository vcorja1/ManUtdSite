// Returns the job title for the corresponding ID
exports.getStaffTitle = function getStaffTitle(titleID) {
	const staffTitles = [
		'Owner', 'Chairman', 'Director', 'Manager', 'Assistant Manager', 'Head of Academy', 'Head of Operations',
		'Head of Academy Recruitment', 'Assistant Head of Academy Recruitment', 'Head of Youth Development',
		'Coach', 'Goalkeeping Coach', 'Fitness Coach', 'Physio', 'Head of Sports Science', 'Data Analyst',
		'Head of Global Scouting', 'Head of European Scouting', 'Chief Scout', 'Scout', 'Player Recruitment'
	];

	return staffTitles[titleID];
}
