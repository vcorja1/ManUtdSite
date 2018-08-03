// Get Helper Functions
const { TEAMS } = require('./teams');

// Store competitions names and indices
const COMPETITIONS = {
	PREMIER_LEAGUE: 0,
	FA_CUP: 1,
	CARABAO_CUP: 2,
	COMMUNITY_SHIELD: 3,
	CHAMPIONS_LEAGUE: 4,
	EUROPA_LEAGUE: 5,
	UEFA_SUPER_CUP: 6,
	FIFA_CLUB_WORLD_CUP: 7,
	INTERNATIONAL_CHAMPIONS_CUP: 8,
	FRIENDLY: 9,
	PREMIER_LEAGUE_2: 10,
	PREMIER_LEAGUE_2_DIV_2: 11,
	PL_INTERNATIONAL_CUP: 12,
	U19_UEFA_YOUTH_LEAGUE: 13,
	U18_PREMIER_LEAGUE_NORTH: 14,
	U18_PREMIER_LEAGUE_CUP: 15,
	FA_YOUTH_CUP: 16,
	OTTEN_CUP: 17,
	VGH_CUP: 18,
	DALLAS_CUP: 19,
	ICGT_TOURNAMENT: 20,
	FA_WOMEN_CHAMPIONSHIP: 21,
	FA_WSL_CUP: 22
};
Object.freeze(COMPETITIONS);

exports.COMPETITIONS = COMPETITIONS;

const COMPETITION_NAMES = [
	'Premier League', 'FA Cup', 'Carabao Cup', 'Community Shield', 'Champions League', 'Europa League',
	'UEFA Super Cup', 'FIFA Club World Cup', 'International Champions Cup', 'Friendly',
	'Premier League 2', 'Premier League 2 Div 2', 'PL International Cup', 'Under-19 UEFA Youth League',
	'U18 Premier League North', 'U18 Premier League Cup', 'FA Youth Cup', 'Otten Cup',
	'Sparkasse & VGH Cup', 'Dallas Cup', 'ICGT Tournament',
	'FA Women\'s Championship', 'FA WSL Cup'
];
Object.freeze(COMPETITION_NAMES);



// Returns the name of the competition based on the ID
exports.getCompetitionName = function getCompetitionName(competitionID) {
	return COMPETITION_NAMES[competitionID];
}


// Get the team by competition ID
exports.getTeamByCompetitionID = function getTeamByCompetitionID(competitionID) {
	// Return friendlies as first team
	if(competitionID <= COMPETITIONS.FRIENDLY) {
		return TEAMS.SENIOR;
	}
	if(competitionID <= COMPETITIONS.U19_UEFA_YOUTH_LEAGUE) {
		return TEAMS.RESERVES;
	}
	if(competitionID <= COMPETITIONS.ICGT_TOURNAMENT) {
		return TEAMS.ACADEMY;
	}
	return TEAMS.WOMEN;
}


// Returns the name of the competition round based on the ID
exports.getCompetitionRoundName = function getCompetitionRoundName(competitionID, round) {

	switch(competitionID) {

		case COMPETITIONS.PREMIER_LEAGUE:
		case COMPETITIONS.PREMIER_LEAGUE_2:
		case COMPETITIONS.PREMIER_LEAGUE_2_DIV_2:
		case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
			return 'Week ' + round;

		case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
			return round === 23 ? 'Final' : ('Week ' + round);

		case COMPETITIONS.COMMUNITY_SHIELD:
		case COMPETITIONS.UEFA_SUPER_CUP:
			return 'Final';

		case COMPETITIONS.FIFA_CLUB_WORLD_CUP:
			return round === 1 ? '1/2 Finals' : (round === 2 ? '3rd Place' : 'Final');

		case COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP:
			return round === 4 ? 'Final' : 'Game ' + round;

		case COMPETITIONS.FRIENDLY:
			return 'FR';

	}


	if(competitionID == COMPETITIONS.FA_CUP || competitionID == COMPETITIONS.FA_YOUTH_CUP) {
		if(round <=  5)
			return 'Rd ' + round;
		if(round == 6)
			return '1/4 Finals';
		if(round == 7)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.CHAMPIONS_LEAGUE) {
	}


	if(competitionID == COMPETITIONS.EUROPA_LEAGUE) {
	}


	if(competitionID == COMPETITIONS.CARABAO_CUP) {
		if(round <= 5)
			return 'Rd ' + round;
		if(round == 6)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.PL_INTERNATIONAL_CUP || competitionID == COMPETITIONS.U18_PREMIER_LEAGUE_CUP) {
		if(round <= 3)
			return 'Game ' + round;
		if(round == 4)
			return '1/4 Finals';
		if(round == 5)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.U19_UEFA_YOUTH_LEAGUE) {
		if(round <= 6)
			return 'Game ' + round;
		if(round <= 8)
			return 'Qualif. ' + (round - 6);
		if(round == 9)
			return 'Playoff';
		if(round == 10)
			return '1/8 Finals';
		if(round == 11)
			return '1/4 Finals';
		if(round == 12)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.OTTEN_CUP) {
		if(round <= 3)
			return 'Game ' + round;
		if(round == 4)
			return '7th/8th Place';
		if(round == 5)
			return '5th/6th Place';
		if(round == 6)
			return '3rd/4th Place';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.VGH_CUP) {
		if(round <= 8)
			return 'Game ' + round;
		if(round == 9)
			return '1/4 Finals';
		if(round == 10)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.DALLAS_CUP) {
		if(round <= 3)
			return 'Game ' + round;
		if(round == 4)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.ICGT_TOURNAMENT) {
		if(round <= 3)
			return 'Game ' + round;
		if(round == 4)
			return '1/2 Finals';
		if(round == 5)
			return '7th/8th Place';
		if(round == 6)
			return '5th/6th Place';
		if(round == 7)
			return '3rd/4th Place';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.FA_WSL_CUP) {
		if(round <= 5)
			return 'Game ' + round;
		if(round == 6)
			return '1/4 Finals';
		if(round == 7)
			return '1/2 Finals';
		return 'Final';
	}


	// Generic response
	return 'Rd ' + round;
}

// Returns the round number after which there is no next game (based on the competition)
function getNoNextRound(competitionID) {

	switch(competitionID) {
		/************* FIRST TEAM *************/
		case COMPETITIONS.PREMIER_LEAGUE:
			return 38;
		case COMPETITIONS.FA_CUP:
			return 8;
		case COMPETITIONS.CARABAO_CUP:
			return 7;
		case COMPETITIONS.COMMUNITY_SHIELD:
		case COMPETITIONS.SUPER_CUP:
		case COMPETITIONS.UEFA_SUPER_CUP:
			return 1;
		case COMPETITIONS.FIFA_CLUB_WORLD_CUP:
			return 2;
		case COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP:
			return 3;


		/************* RESERVES TEAM *************/
		case COMPETITIONS.PREMIER_LEAGUE_2:
		case COMPETITIONS.PREMIER_LEAGUE_2_DIV_2:
			return 22;
		case COMPETITIONS.PL_INTERNATIONAL_CUP:
			return 6;
		case COMPETITIONS.U19_UEFA_YOUTH_LEAGUE:
			return 13;


		/************* ACADEMY TEAM *************/
		case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
			return 22;
		case COMPETITIONS.U18_PREMIER_LEAGUE_CUP:
			return 6;
		case COMPETITIONS.FA_YOUTH_CUP:
			return 8;
		case COMPETITIONS.OTTEN_CUP:
			return 4;
		case COMPETITIONS.VGH_CUP:
			return 11;
		case COMPETITIONS.DALLAS_CUP:
		case COMPETITIONS.ICGT_TOURNAMENT:
			return 5;


		/************* WOMEN'S TEAM *************/
		case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
			return 22;
		case COMPETITIONS.FA_WSL_CUP:
			return 7;



		case COMPETITIONS.CHAMPIONS_LEAGUE:
		case COMPETITIONS.EUROPA_LEAGUE:
			return 14;


		default:
			return -1;
	}
	
}

// Returns the competition logo based on the ID
exports.getCompetitionLogoSrc = function getCompetitionLogoSrc(competitionID) {
	const LOGOS_FOLDER = '/img/competitionLogos/';

	switch(competitionID) {
		/************* FIRST TEAM *************/
		case COMPETITIONS.PREMIER_LEAGUE:
			return LOGOS_FOLDER + 'epl.png';
		case COMPETITIONS.FA_CUP:
			return LOGOS_FOLDER + 'fa.png';
		case COMPETITIONS.CARABAO_CUP:
			return LOGOS_FOLDER + 'carabao.jpg';
		case COMPETITIONS.COMMUNITY_SHIELD:
			return LOGOS_FOLDER + 'community_shield.png';
		case COMPETITIONS.CHAMPIONS_LEAGUE:
			return LOGOS_FOLDER + 'ucl.png';
		case COMPETITIONS.EUROPA_LEAGUE:
			return LOGOS_FOLDER + 'europa_league.jpg';
		case COMPETITIONS.UEFA_SUPER_CUP:
			return LOGOS_FOLDER + 'super_cup.png';
		case COMPETITIONS.FIFA_CLUB_WORLD_CUP:
			return LOGOS_FOLDER + 'fifa_club_world_cup.png';
		case COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP:
			return LOGOS_FOLDER + 'icc.png';


		/************* RESERVES TEAM *************/
		case COMPETITIONS.PREMIER_LEAGUE_2:
			return LOGOS_FOLDER + 'pl2.jpg';
		case COMPETITIONS.PREMIER_LEAGUE_2_DIV_2:
			return LOGOS_FOLDER + 'pl2_div2.png';
		case COMPETITIONS.PL_INTERNATIONAL_CUP:
			return LOGOS_FOLDER + 'plic.png';
		case COMPETITIONS.U19_UEFA_YOUTH_LEAGUE:
			return LOGOS_FOLDER + 'uefa_youth_league.png';


		/************* ACADEMY TEAM *************/
		case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
			return LOGOS_FOLDER + 'u18_pl.jpg';
		case COMPETITIONS.U18_PREMIER_LEAGUE_CUP:
			return LOGOS_FOLDER + 'u18_pl_cup.jpg';
		case COMPETITIONS.FA_YOUTH_CUP:
			return LOGOS_FOLDER + 'fa_youth_cup.png';
		case COMPETITIONS.OTTEN_CUP:
			return LOGOS_FOLDER + 'otten_cup.png';
		case COMPETITIONS.VGH_CUP:
			return LOGOS_FOLDER + 'vgh_cup.png';
		case COMPETITIONS.DALLAS_CUP:
			return LOGOS_FOLDER + 'dallas_cup.png';
		case COMPETITIONS.ICGT_TOURNAMENT:
			return LOGOS_FOLDER + 'icgt.jpg';


		/************* WOMEN'S TEAM *************/
		case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
			return LOGOS_FOLDER + 'fa_women_championship.jpg';
		case COMPETITIONS.FA_WSL_CUP:
			return LOGOS_FOLDER + 'fa_wsl_cup.png';


		default:
			return null;
	}
}