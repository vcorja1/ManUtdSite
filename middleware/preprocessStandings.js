// Connect to Heroku database
const { Client } = require('pg');

// Get Helper Functions
const { COMPETITIONS, getCompetitionName } = require('../helpers/competitions');

// Define Constants
const STANDINGS_LOCATION = '/standings/';
const RESERVES_STANDINGS_LOCATION = '/reserves-standings/';
const ACADEMY_STANDINGS_LOCATION = '/academy-standings/';
const WOMEN_STANDINGS_LOCATION = '/women-standings/';


// Helper function to process cups not drawn or ones MUFC is not participating in this season
function getUnavailableCupMessage(name, link, message, isDisplayedInSummary) {
	return {
		competitionName: name,
		competitionLink: link,
		specialNote: message,
		shouldDisplayInSummary: isDisplayedInSummary
	};
}

// Process Cups That Aren't Played In This Season, Or That Haven't Been Drawn Yet
exports.preprocessStandings = (req, res, next) => {
	// Get Client
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	// Connect
	client.connect();

	// Get Staff Data
	client.query(`SELECT * FROM OTHER_INFO;`, (err, resp) => {
		// Handle error
		if (err || !resp) {
			req.loadedData = false;
			res.status(400);
			return next();
		}

		// Save all information
		req.otherInfo = JSON.parse(JSON.stringify(resp.rows));

		// Prepare constants
		const CURRENT_SEASON = req.otherInfo.filter(row => row.info_name == 'CURRENT_YEAR')[0].info_value;
		const NOT_PARTICIPATING = 'Manchester United will not play in this competition this season.';
		const SCHEDULE_LATER = `The schedule will be released later this season.`;
		const ENTER_LATER = `Manchester United will enter in the later rounds. The draw will take place in late ${CURRENT_SEASON.substr(0, 4)}.`;

		// Select competitions
		const competitionsInfo = req.otherInfo.filter(row => row.info_name == 'COMPETITIONS');

		competitionsInfo.forEach( (competition) => {
			const competitionName = getCompetitionName(competition.info_competition).toUpperCase();
			const shouldDisplayInSummary = competition.info_value != 'NOT_PARTICIPATING';
			const specialCupNote = shouldDisplayInSummary ? ENTER_LATER : NOT_PARTICIPATING;
			const specialLeagueNote = shouldDisplayInSummary ? SCHEDULE_LATER : NOT_PARTICIPATING;

			switch(competition.info_competition) {

				/************* FIRST TEAM *************/
				case COMPETITIONS.PREMIER_LEAGUE:
					req.eplData = getUnavailableCupMessage(
						competitionName,
						STANDINGS_LOCATION + 'premier-league',
						specialLeagueNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.FA_CUP:
					req.faCupData = getUnavailableCupMessage(
						competitionName,
						STANDINGS_LOCATION + 'fa-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.CARABAO_CUP:
					req.carabaoCupData = getUnavailableCupMessage(
						competitionName,
						STANDINGS_LOCATION + 'carabao-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.COMMUNITY_SHIELD:
					req.communityShieldData = getUnavailableCupMessage(
						competitionName,
						STANDINGS_LOCATION + 'community-shield',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.CHAMPIONS_LEAGUE:
					req.uclData = getUnavailableCupMessage(
						competitionName,
						STANDINGS_LOCATION + 'champions-league',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.EUROPA_LEAGUE:
					req.europaLeagueData = getUnavailableCupMessage(
						competitionName,
						STANDINGS_LOCATION + 'europa-league',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.UEFA_SUPER_CUP:
					req.superCupData = getUnavailableCupMessage(
						competitionName,
						STANDINGS_LOCATION + 'super-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.FIFA_CLUB_WORLD_CUP:
					req.clubWorldCupData = getUnavailableCupMessage(
						competitionName,
						STANDINGS_LOCATION + 'club-world-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.INTERNATIONAL_CHAMPIONS_CUP:
					req.iccData = getUnavailableCupMessage(
						competitionName,
						STANDINGS_LOCATION + 'international-champions-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;


				/************* RESERVES TEAM *************/
				case COMPETITIONS.PREMIER_LEAGUE_2:
					req.pl2Data = getUnavailableCupMessage(
						competitionName,
						RESERVES_STANDINGS_LOCATION + 'premier-league-2',
						specialLeagueNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.PREMIER_LEAGUE_2_DIV_2:
					req.pl2Div2Data = getUnavailableCupMessage(
						competitionName,
						RESERVES_STANDINGS_LOCATION + 'premier-league-2-div-2',
						specialLeagueNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.PL_INTERNATIONAL_CUP:
					req.plIntlCupData = getUnavailableCupMessage(
						competitionName,
						RESERVES_STANDINGS_LOCATION + 'pl-international-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.EFL_TROPHY:
					req.eflTrophyData = getUnavailableCupMessage(
						competitionName,
						RESERVES_STANDINGS_LOCATION + 'efl-trophy',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.U19_UEFA_YOUTH_LEAGUE:
					req.youthLeagueData = getUnavailableCupMessage(
						competitionName,
						RESERVES_STANDINGS_LOCATION + 'youth-league',
						specialCupNote,
						shouldDisplayInSummary);
					break;


				/************* ACADEMY TEAM *************/
				case COMPETITIONS.U18_PREMIER_LEAGUE_NORTH:
					req.u18PlNorthData = getUnavailableCupMessage(
						competitionName,
						ACADEMY_STANDINGS_LOCATION + 'premier-league-north',
						specialLeagueNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.U18_PREMIER_LEAGUE_CUP:
					req.plCupData = getUnavailableCupMessage(
						competitionName,
						ACADEMY_STANDINGS_LOCATION + 'premier-league-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.FA_YOUTH_CUP:
					req.faYouthCupData = getUnavailableCupMessage(
						competitionName,
						ACADEMY_STANDINGS_LOCATION + 'fa-youth-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.RUHR_CUP:
					req.ruhrCupData = getUnavailableCupMessage(
						competitionName,
						ACADEMY_STANDINGS_LOCATION + 'ruhr-cup',
						specialCupNote,
						false);
					break;
				case COMPETITIONS.OTTEN_CUP:
					req.ottenCupData = getUnavailableCupMessage(
						competitionName,
						ACADEMY_STANDINGS_LOCATION + 'otten-cup',
						specialCupNote,
						false);
					break;
				case COMPETITIONS.VGH_CUP:
					req.vghCupData = getUnavailableCupMessage(
						competitionName,
						ACADEMY_STANDINGS_LOCATION + 'vgh-cup',
						specialCupNote,
						false);
					break;
				case COMPETITIONS.DALLAS_CUP:
					req.dallasCupData = getUnavailableCupMessage(
						competitionName,
						ACADEMY_STANDINGS_LOCATION + 'dallas-cup',
						specialCupNote,
						false);
					break;
				case COMPETITIONS.ICGT_TOURNAMENT:
					req.icgtTournamentData = getUnavailableCupMessage(
						competitionName,
						ACADEMY_STANDINGS_LOCATION + 'icgt-tournament',
						specialCupNote,
						false);
					break;


				/************* WOMEN'S TEAM *************/
				case COMPETITIONS.FA_WOMEN_SUPER_LEAGUE:
					req.faWomenSuperLeagueData = getUnavailableCupMessage(
						competitionName,
						WOMEN_STANDINGS_LOCATION + 'fa-women-super-league',
						specialLeagueNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.FA_WOMEN_CHAMPIONSHIP:
					req.faWomenChampionshipData = getUnavailableCupMessage(
						competitionName,
						WOMEN_STANDINGS_LOCATION + 'fa-women-championship',
						specialLeagueNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.WOMEN_FA_CUP:
					req.womenFaCupData = getUnavailableCupMessage(
						competitionName,
						WOMEN_STANDINGS_LOCATION + 'women-fa-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;
				case COMPETITIONS.FA_WSL_CUP:
					req.faWSLCupData = getUnavailableCupMessage(
						competitionName,
						WOMEN_STANDINGS_LOCATION + 'fa-wsl-cup',
						specialCupNote,
						shouldDisplayInSummary);
					break;
			}
		});

		// End connection
		client.end();

		// Continue
		return next();
	});

};