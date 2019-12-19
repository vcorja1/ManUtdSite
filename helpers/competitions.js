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
	EFL_TROPHY: 13,
	U19_UEFA_YOUTH_LEAGUE: 14,
	U18_PREMIER_LEAGUE_NORTH: 15,
	U18_PREMIER_LEAGUE_CUP: 16,
	FA_YOUTH_CUP: 17,
	RURH_CUP: 18,
	OTTEN_CUP: 19,
	VGH_CUP: 20,
	DALLAS_CUP: 21,
	ICGT_TOURNAMENT: 22,
	FA_WOMEN_SUPER_LEAGUE: 23,
	FA_WOMEN_CHAMPIONSHIP: 24,
	WOMEN_FA_CUP: 25,
	FA_WSL_CUP: 26
};
Object.freeze(COMPETITIONS);

exports.COMPETITIONS = COMPETITIONS;

const COMPETITION_NAMES = [
	'Premier League', 'FA Cup', 'Carabao Cup', 'Community Shield', 'Champions League', 'Europa League',
	'UEFA Super Cup', 'FIFA Club World Cup', 'International Champions Cup', 'Friendly',
	'Premier League 2', 'Premier League 2 Div 2', 'PL International Cup', 'EFL Trophy', 'Under-19 UEFA Youth League',
	'U18 Premier League North', 'U18 Premier League Cup', 'FA Youth Cup', 'Ruhr Cup', 'Otten Cup',
	'Sparkasse & VGH Cup', 'Dallas Cup', 'ICGT Tournament',
	'FA Women\'s Super League', 'FA Women\'s Championship', 'Women\'s FA Cup', 'FA WSL Cup'
];
Object.freeze(COMPETITION_NAMES);

const COMPETITION_TYPE = {
	TABLE: 1,
	MIXED: 2,
	KNOCKOUT: 3
};
Object.freeze(COMPETITION_TYPE);

exports.COMPETITION_TYPE = COMPETITION_TYPE;



// Returns the name of the competition based on the ID
exports.getCompetitionName = function getCompetitionName(competitionID) {
	return COMPETITION_NAMES[competitionID];
};


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
};


// Returns the name of the competition round based on the ID
exports.getCompetitionRoundName = function getCompetitionRoundName(competitionID, round) {

	switch(competitionID) {

		case COMPETITIONS.PREMIER_LEAGUE:
		case COMPETITIONS.PREMIER_LEAGUE_2:
		case COMPETITIONS.PREMIER_LEAGUE_2_DIV_2:
		case COMPETITIONS.FA_WOMEN_SUPER_LEAGUE:
		case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
			return 'Week ' + round;

		case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
			return round === 23 ? 'Final' : ('Week ' + round);

		case COMPETITIONS.COMMUNITY_SHIELD:
		case COMPETITIONS.UEFA_SUPER_CUP:
			return 'Final';

		case COMPETITIONS.FIFA_CLUB_WORLD_CUP:
			return round === 1 ? '1/2 Finals' : (round === 2 ? '3rd/4th Place' : 'Final');

		case COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP:
			return round === 4 ? 'Final' : 'Game ' + round;

		case COMPETITIONS.FRIENDLY:
			return 'FR';

	}


	if(competitionID == COMPETITIONS.FA_CUP || competitionID == COMPETITIONS.FA_YOUTH_CUP || competitionID == COMPETITIONS.WOMEN_FA_CUP) {
		if(round <= 5)
			return 'Rd ' + round;
		if(round == 6)
			return '1/4 Finals';
		if(round == 7)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.CARABAO_CUP) {
		if(round <= 5)
			return 'Rd ' + round;
		if(round <= 7)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.CHAMPIONS_LEAGUE) {
		if(round <= 2)
			return 'Playoff Round';
		if(round <= 8)
			return 'Game ' + (round - 2);
		if(round <= 10)
			return '1/8 Finals';
		if(round <= 12)
			return '1/4 Finals';
		if(round <= 14)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.EFL_TROPHY) {
		if(round <= 3)
			return 'Game ' + round;
		if(round == 4)
			return 'Round of 32';
		if(round == 5)
			return '1/8 Finals';
		if(round == 6)
			return '1/4 Finals';
		if(round == 7)
			return '1/2 Finals';
		return 'Final';
	}


	if(competitionID == COMPETITIONS.EUROPA_LEAGUE) {
		if(round <= 2)
			return '2nd Qualif. Round';
		if(round <= 2)
			return '3rd Qualif. Round';
		if(round <= 6)
			return 'Playoff Round';
		if(round <= 12)
			return 'Game ' + (round - 6);
		if(round <= 14)
			return 'Round of 32';
		if(round <= 16)
			return '1/8 Finals';
		if(round <= 18)
			return '1/4 Finals';
		if(round <= 20)
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
		if(round <= 2)
			return 'Qualification';
		if(round <= 8)
			return 'Game ' + (round - 2);
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


	if(competitionID == COMPETITIONS.RUHR_CUP) {
		if(round <= 4)
			return 'Game ' + round;
		if(round == 5)
			return '1/2 Finals';
		if(round == 6)
			return '9th/10th Place';
		if(round == 7)
			return '7th/8th Place';
		if(round == 8)
			return '5th/6th Place';
		if(round == 9)
			return '3rd/4th Place';
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
		if(round <= 4)
			return 'Game ' + round;
		if(round == 5)
			return '1/4 Finals';
		if(round == 6)
			return '1/2 Finals';
		return 'Final';
	}


	// Generic response
	return 'Rd ' + round;
};


// Returns the competition details
exports.getCompetitionDetails = function getCompetitionDetails(competitionID) {

	switch(competitionID) {

		/************* TABLE COMPETITIONS *************/

		case COMPETITIONS.PREMIER_LEAGUE:
			return {
				type: COMPETITION_TYPE.TABLE,
				finalRound: 38,
				relegationPlace: 18
			};
		case COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP:
			return {
				type: COMPETITION_TYPE.TABLE,
				finalRound: 3,
				relegationPlace: null
			};
		case COMPETITIONS.PREMIER_LEAGUE_2:
			return {
				type: COMPETITION_TYPE.TABLE,
				finalRound: 22,
				relegationPlace: 11
			};
		case COMPETITIONS.PREMIER_LEAGUE_2_DIV_2:
			return {
				type: COMPETITION_TYPE.TABLE,
				finalRound: 22,
				relegationPlace: null
			};
		case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
			return {
				type: COMPETITION_TYPE.TABLE,
				finalRound: 22,
				relegationPlace: null
			};
		case COMPETITIONS.FA_WOMEN_SUPER_LEAGUE:
			return {
				type: COMPETITION_TYPE.TABLE,
				finalRound: 22,
				relegationPlace: 12
			};
		case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
			return {
				type: COMPETITION_TYPE.TABLE,
				finalRound: 20,
				relegationPlace: 11
			};


		/************* MIXED COMPETITIONS *************/

		case COMPETITIONS.CHAMPIONS_LEAGUE:
			return {
				type: COMPETITION_TYPE.MIXED,
				finalRound: 15,
				groupStageMin: 3,
				groupStageMax: 8,
				groupStageAdvance: 2,
				isSingleRoundElim: false
			};
		case COMPETITIONS.EUROPA_LEAGUE:
			return {
				type: COMPETITION_TYPE.MIXED,
				finalRound: 21,
				groupStageMin: 7,
				groupStageMax: 12,
				groupStageAdvance: 2,
				isSingleRoundElim: false
			};
		case COMPETITIONS.PL_INTERNATIONAL_CUP:
			return {
				type: COMPETITION_TYPE.MIXED,
				finalRound: 8,
				groupStageMin: 1,
				groupStageMax: 3,
				groupStageAdvance: 1,
				isSingleRoundElim: true
			};
		case COMPETITIONS.EFL_TROPHY:
			return {
				type: COMPETITION_TYPE.MIXED,
				finalRound: 8,
				groupStageMin: 1,
				groupStageMax: 3,
				groupStageAdvance: 2,
				isSingleRoundElim: true
			};
		case COMPETITIONS.U19_UEFA_YOUTH_LEAGUE:
			return {
				type: COMPETITION_TYPE.MIXED,
				finalRound: 13,
				groupStageMin: 3,
				groupStageMax: 8,
				groupStageAdvance: 2,
				isSingleRoundElim: true
			};
		case COMPETITIONS.U18_PREMIER_LEAGUE_CUP:
			return {
				type: COMPETITION_TYPE.MIXED,
				finalRound: 6,
				groupStageMin: 1,
				groupStageMax: 3,
				groupStageAdvance: 2,
				isSingleRoundElim: true
			};
		case COMPETITIONS.FA_WSL_CUP:
			return {
				type: COMPETITION_TYPE.MIXED,
				finalRound: 9,
				groupStageMin: 1,
				groupStageMax: 4,
				groupStageAdvance: 2,
				isSingleRoundElim: true
			};


		/*********** KNOCKOUT COMPETITIONS ************/

		case COMPETITIONS.FA_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 8,
				noNextRound: 8
			};
		case COMPETITIONS.CARABAO_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 7,
				noNextRound: 7
			};
		case COMPETITIONS.COMMUNITY_SHIELD:
		case COMPETITIONS.UEFA_SUPER_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 1,
				noNextRound: 1
			};
		case COMPETITIONS.FIFA_CLUB_WORLD_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 3,
				noNextRound: 2
			};
		case COMPETITIONS.FA_YOUTH_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 8,
				noNextRound: 8
			};
		case COMPETITIONS.RUHR_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 10,
				noNextRound: 6
			};
		case COMPETITIONS.OTTEN_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 7,
				noNextRound: 4
			};
		case COMPETITIONS.VGH_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 11,
				noNextRound: 11
			};
		case COMPETITIONS.DALLAS_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 5,
				noNextRound: 5
			};
		case COMPETITIONS.ICGT_TOURNAMENT:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 8,
				noNextRound: 5
			};
		case COMPETITIONS.WOMEN_FA_CUP:
			return {
				type: COMPETITION_TYPE.KNOCKOUT,
				finalRound: 8,
				noNextRound: 8
			};
	}

	return null;
};


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
		case COMPETITIONS.EFL_TROPHY:
			return LOGOS_FOLDER + 'efl_trophy.jpg';
		case COMPETITIONS.U19_UEFA_YOUTH_LEAGUE:
			return LOGOS_FOLDER + 'uefa_youth_league.png';


		/************* ACADEMY TEAM *************/
		case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
			return LOGOS_FOLDER + 'u18_pl.jpg';
		case COMPETITIONS.U18_PREMIER_LEAGUE_CUP:
			return LOGOS_FOLDER + 'u18_pl_cup.jpg';
		case COMPETITIONS.FA_YOUTH_CUP:
			return LOGOS_FOLDER + 'fa_youth_cup.png';
		case COMPETITIONS.RUHR_CUP:
			return LOGOS_FOLDER + 'ruhr_cup.png';
		case COMPETITIONS.OTTEN_CUP:
			return LOGOS_FOLDER + 'otten_cup.png';
		case COMPETITIONS.VGH_CUP:
			return LOGOS_FOLDER + 'vgh_cup.png';
		case COMPETITIONS.DALLAS_CUP:
			return LOGOS_FOLDER + 'dallas_cup.png';
		case COMPETITIONS.ICGT_TOURNAMENT:
			return LOGOS_FOLDER + 'icgt.jpg';


		/************* WOMEN'S TEAM *************/
		case COMPETITIONS.FA_WOMEN_SUPER_LEAGUE:
			return LOGOS_FOLDER + 'fa_women_super_league.jpg';
		case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
			return LOGOS_FOLDER + 'fa_women_championship.jpg';
		case COMPETITIONS.WOMEN_FA_CUP:
			return LOGOS_FOLDER + 'women_fa_cup.png';
		case COMPETITIONS.FA_WSL_CUP:
			return LOGOS_FOLDER + 'fa_wsl_cup.png';


		default:
			return null;
	}
};