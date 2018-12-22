const TEAMS = {
	SENIOR: 0,
	RESERVES: 1,
	ACADEMY: 2,
	U16_TEAM: 3,
	U14_TEAM: 4,
	U12_TEAM: 5,
	U10_TEAM: 6,
	U9_TEAM: 7,
	WOMEN: 8
};
Object.freeze(TEAMS);

exports.TEAMS = TEAMS;

const INTERNATIONAL_TEAMS = {
	SENIOR: 0,
	U23_TEAM: 1,
	U21_TEAM: 2,
	U20_TEAM: 3,
	U19_TEAM: 4,
	U18_TEAM: 5,
	U17_TEAM: 6,
	U16_TEAM: 7
};
Object.freeze(INTERNATIONAL_TEAMS);

exports.INTERNATIONAL_TEAMS = INTERNATIONAL_TEAMS;

// Gets the proper team ending
exports.getInternationalTeamName = function getInternationalTeamName(team) {
	if(team === INTERNATIONAL_TEAMS.SENIOR)
		return 'Senior';
	if(team === INTERNATIONAL_TEAMS.U23_TEAM)
		return 'Under-23';
	if(team === INTERNATIONAL_TEAMS.U21_TEAM)
		return 'Under-21';
	if(team === INTERNATIONAL_TEAMS.U20_TEAM)
		return 'Under-20';
	if(team === INTERNATIONAL_TEAMS.U19_TEAM)
		return 'Under-19';
	if(team === INTERNATIONAL_TEAMS.U18_TEAM)
		return 'Under-18';
	if(team === INTERNATIONAL_TEAMS.U17_TEAM)
		return 'Under-17';
	if(team === INTERNATIONAL_TEAMS.U16_TEAM)
		return 'Under-16';
	return null;
};
