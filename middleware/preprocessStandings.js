// Get Helper Functions
const { COMPETITIONS } = require('../helpers/competitions');

// Define Constants
const CURRENT_SEASON = ' 2018/19';
const STANDINGS_LOCATION = '/standings/';
const RESERVES_STANDINGS_LOCATION = '/reserves-standings/';
const ACADEMY_STANDINGS_LOCATION = '/academy-standings/';


// Helper function to process cups not drawn or ones MUFC is not participating in this season
function getUnavailableCupMessage(name, link, message, isDisplayedInSummary) {
	return {
		competitionName: name + CURRENT_SEASON,
		competitionLink: link,
		specialNote: message,
		shouldDisplayInSummary: isDisplayedInSummary
	};
}

// Process Cups That Aren't Played In This Season, Or That Haven't Been Drawn Yet
exports.preprocessStandings = (req, res, next) => {

	const NOT_PARTICIPATING = 'Manchester United will not play in this competition this season.';

	// Community Shield
	req.communityShieldData = getUnavailableCupMessage(
		'COMMUNITY SHIELD',
		STANDINGS_LOCATION + 'community-shield',
		NOT_PARTICIPATING,
		false);

	// Europa League
	req.europaLeagueData = getUnavailableCupMessage(
		'EUROPA LEAGUE',
		STANDINGS_LOCATION + 'europa-league',
		NOT_PARTICIPATING,
		false);

	// UEFA Super Cup
	req.superCupData = getUnavailableCupMessage(
		'UEFA SUPER CUP',
		STANDINGS_LOCATION + 'super-cup',
		NOT_PARTICIPATING,
		false);

	// FIFA Club World Cup
	req.clubWorldCupData = getUnavailableCupMessage(
		'FIFA CLUB WORLD CUP',
		STANDINGS_LOCATION + 'club-world-cup',
		NOT_PARTICIPATING,
		false);

	// Premier League 2
	req.pl2Data = getUnavailableCupMessage(
		'PREMIER LEAGUE 2',
		RESERVES_STANDINGS_LOCATION + 'premier-league-2',
		NOT_PARTICIPATING,
		false);




	const ENTER_LATER = 'Manchester United will enter in the Third Round. The draw will take place in late 2018.';

	// FA Cup
	req.faCupData = getUnavailableCupMessage(
		'FA CUP',
		STANDINGS_LOCATION + 'fa-cup',
		ENTER_LATER,
		true);

	// Carabao Cup
	req.carabaoCupData = getUnavailableCupMessage(
		'CARABAO CUP',
		STANDINGS_LOCATION + 'carabao-cup',
		ENTER_LATER,
		true);

	// FA Youth Cup
	req.faYouthCupData = getUnavailableCupMessage(
		'FA YOUTH CUP',
		ACADEMY_STANDINGS_LOCATION + 'fa-youth-cup',
		ENTER_LATER,
		true);




	const UCL_DRAW = 'Manchester United will enter in the Group Stage round. The draw will take place in Monaco on August 30, 2018.';

	// Champions League
	req.uclData = getUnavailableCupMessage(
		'CHAMPIONS LEAGUE',
		STANDINGS_LOCATION + 'champions-league',
		UCL_DRAW,
		true);

	// Under-19 UEFA Youth League
	req.youthLeagueData = getUnavailableCupMessage(
		'UEFA YOUTH LEAGUE',
		RESERVES_STANDINGS_LOCATION + 'youth-league',
		UCL_DRAW,
		true);




	const DRAW_LATER = 'Manchester United will enter in the Group Stage round. The draw will take place in late 2018.';

	// U18 Premier League Cup
	req.plCupData = getUnavailableCupMessage(
		'U18 Premier League Cup',
		ACADEMY_STANDINGS_LOCATION + 'premier-league-cup',
		DRAW_LATER,
		true);


	// Continue
	return next();
}