// Get Helper Functions
const { COMPETITIONS } = require('./competitions');
const { TEAMS } = require('./teams');

// Store constants
const CLUB_LOGOS_FOLDER = '/img/clubLogos/';


/* -------------------------------------------------------- */
/* ------------------ CLUB INFORMATION -------------------- */
/* -------------------------------------------------------- */

// Gets the proper team ending
function getTeamNameEnding(team, competition) {
	if(team === TEAMS.RESERVES)
		return competition === COMPETITIONS.U19_UEFA_YOUTH_LEAGUE ? ' U19' : ' U23';
	if(team === TEAMS.ACADEMY)
		return ' U18';
	return '';
}


// Removes tags like 'FC' from the name
function removeTeamNameAbbr(teamName) {
	// Keep some names as they are
	if (teamName === 'Toronto FC') {
		return teamName;
	}

	// Otherwise remove ending
	const ending = teamName.substr(-3);
	if(ending === ' FC' || ending === ' CF')
		return teamName.slice(0, -3);
	if(teamName.substr(-4) === ' AFC' || teamName.substr(-4) === ' LFC')
		return teamName.slice(0, -4);

	// Or remove beginning
	var start = teamName.substr(0,3);
	if(start === 'UC ' || start === 'SL ' || start === 'FC ' || start === 'FK ' || start === 'AS ' || start === 'KV ' || start === 'SV ')
		return teamName.substr(3);
	start = teamName.substr(0,4);
	if(start === 'AFC ' || start === 'RSC ' || start === 'BSC ')
		return teamName.substr(4);

	// Special cases below
	if(teamName === 'Valerenga Fotball')
		return 'Valerenga';
	if(teamName === '1.FSV Mainz 05')
		return 'Mainz 05';

	return teamName;
}


// Get full club data
exports.getClubData = function getClubData(clubName, team, competition) {
	let displayName = removeTeamNameAbbr(clubName);
	let teamNameEnding = getTeamNameEnding(team, competition);

	switch(displayName) {

		/***************************************************/
		/**************** Manchester United ****************/
		/***************************************************/

		case 'Manchester United':
			return {
				teamName: 'Manchester United FC',
				fullName: 'Manchester United FC' + teamNameEnding,
				displayName: 'Manchester United' + teamNameEnding,
				displayNameShort: 'Man Utd' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Manchester_United.svg'
			}

		/***************************************************/
		/***************** TBD Stub Fixture ****************/
		/***************************************************/

		case 'TBD':
			return {
				teamName: 'TBD',
				fullName: 'TBD',
				displayName: 'TBD',
				displayNameShort: 'TBD',
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'defaultCrest.png'
			}


		/***************************************************/
		/***************** Premier League ******************/
		/***************************************************/

		case 'Arsenal':
			return {
				teamName: 'Arsenal FC',
				fullName: 'Arsenal FC' + teamNameEnding,
				displayName: 'Arsenal' + teamNameEnding,
				displayNameShort: 'Arsenal' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Arsenal.svg'
			};
		case 'Bournemouth':
			return {
				teamName: 'AFC Bournemouth',
				fullName: 'AFC Bournemouth' + teamNameEnding,
				displayName: 'Bournemouth' + teamNameEnding,
				displayNameShort: 'Bournemouth' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Bournemouth.svg'
			};
		case 'Brighton & Hove Albion':
			return {
				teamName: 'Brighton & Hove Albion FC',
				fullName: 'Brighton & Hove Albion FC' + teamNameEnding,
				displayName: 'Brighton & Hove Albion' + teamNameEnding,
				displayNameShort: 'Brighton' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Brighton_&_Hove_Albion.svg'
			};
		case 'Burnley':
			return {
				teamName: 'Burnley FC',
				fullName: 'Burnley FC' + teamNameEnding,
				displayName: 'Burnley' + teamNameEnding,
				displayNameShort: 'Burnley' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Burnley.svg'
			};
		case 'Cardiff City':
			return {
				teamName: 'Cardiff City FC',
				fullName: 'Cardiff City FC' + teamNameEnding,
				displayName: 'Cardiff City' + teamNameEnding,
				displayNameShort: 'Cardiff' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Cardiff_City.svg'
			};
		case 'Chelsea':
			return {
				teamName: 'Chelsea FC',
				fullName: 'Chelsea FC' + teamNameEnding,
				displayName: 'Chelsea' + teamNameEnding,
				displayNameShort: 'Chelsea' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Chelsea.svg'
			};
		case 'Crystal Palace':
			return {
				teamName: 'Crystal Palace FC',
				fullName: 'Crystal Palace FC' + teamNameEnding,
				displayName: 'Crystal Palace' + teamNameEnding,
				displayNameShort: 'Crystal Palace' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Crystal_Palace.svg'
			};
		case 'Everton':
			return {
				teamName: 'Everton FC',
				fullName: 'Everton FC' + teamNameEnding,
				displayName: 'Everton' + teamNameEnding,
				displayNameShort: 'Everton' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Everton.svg'
			};
		case 'Fulham':
			return {
				teamName: 'Fulham FC',
				fullName: 'Fulham FC' + teamNameEnding,
				displayName: 'Fulham' + teamNameEnding,
				displayNameShort: 'Fulham' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Fulham.svg'
			};
		case 'Huddersfield Town':
			return {
				teamName: 'Huddersfield Town AFC',
				fullName: 'Huddersfield Town AFC' + teamNameEnding,
				displayName: 'Huddersfield Town' + teamNameEnding,
				displayNameShort: 'Huddersfield' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Huddersfield_Town.svg'
			};
		case 'Leicester City':
			return {
				teamName: 'Leicester City FC',
				fullName: 'Leicester City FC' + teamNameEnding,
				displayName: 'Leicester City' + teamNameEnding,
				displayNameShort: 'Leicester' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Leicester_City.svg'
			};
		case 'Leicester City WFC':
			return {
				teamName: 'Leicester City WFC',
				fullName: 'Leicester City WFC' + teamNameEnding,
				displayName: 'Leicester City' + teamNameEnding,
				displayNameShort: 'Leicester' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Leicester_City.svg'
			};
		case 'Liverpool':
			return {
				teamName: 'Liverpool FC',
				fullName: 'Liverpool FC' + teamNameEnding,
				displayName: 'Liverpool' + teamNameEnding,
				displayNameShort: 'Liverpool' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Liverpool.svg'
			};
		case 'Manchester City':
			return {
				teamName: 'Manchester City FC',
				fullName: 'Manchester City FC' + teamNameEnding,
				displayName: 'Manchester City' + teamNameEnding,
				displayNameShort: 'Man City' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Manchester_City.svg'
			};
		case 'Newcastle United':
			return {
				teamName: 'Newcastle United FC',
				fullName: 'Newcastle United FC' + teamNameEnding,
				displayName: 'Newcastle United' + teamNameEnding,
				displayNameShort: 'Newcastle' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Newcastle_United.svg'
			};
		case 'Southampton':
			return {
				teamName: 'Southampton FC',
				fullName: 'Southampton FC' + teamNameEnding,
				displayName: 'Southampton' + teamNameEnding,
				displayNameShort: 'Southampton' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Southampton.svg'
			};
		case 'Tottenham Hotspur':
			return {
				teamName: 'Tottenham Hotspur FC',
				fullName: 'Tottenham Hotspur FC' + teamNameEnding,
				displayName: 'Tottenham Hotspur' + teamNameEnding,
				displayNameShort: 'Tottenham' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Tottenham_Hotspur.svg'
			};
		case 'Watford':
			return {
				teamName: 'Watford FC',
				fullName: 'Watford FC' + teamNameEnding,
				displayName: 'Watford' + teamNameEnding,
				displayNameShort: 'Watford' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Watford.svg'
			};
		case 'West Ham United':
			return {
				teamName: 'West Ham United FC',
				fullName: 'West Ham United FC' + teamNameEnding,
				displayName: 'West Ham United' + teamNameEnding,
				displayNameShort: 'West Ham' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'West_Ham_United.svg'
			};
		case 'Wolverhampton Wanderers':
		case 'Wolves':
			return {
				teamName: 'Wolverhampton Wanderers FC',
				fullName: 'Wolverhampton Wanderers FC' + teamNameEnding,
				displayName: 'Wolverhampton Wanderers' + teamNameEnding,
				displayNameShort: 'Wolves' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Wolverhampton_Wanderers.svg'
			};


		/***************************************************/
		/*************** Other English Clubs ***************/
		/***************************************************/

		case 'Aston Villa':
			return {
				teamName: 'Aston Villa FC',
				fullName: 'Aston Villa FC' + teamNameEnding,
				displayName: 'Aston Villa' + teamNameEnding,
				displayNameShort: 'Villa' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Aston_Villa.svg'
			};
		case 'Birmingham City':
			return {
				teamName: 'Birmingham City FC',
				fullName: 'Birmingham City FC' + teamNameEnding,
				displayName: 'Birmingham City' + teamNameEnding,
				displayNameShort: 'Birmingham' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Birmingham_City.svg'
			};
		case 'Blackburn Rovers':
			return {
				teamName: 'Blackburn Rovers FC',
				fullName: 'Blackburn Rovers FC' + teamNameEnding,
				displayName: 'Blackburn Rovers' + teamNameEnding,
				displayNameShort: 'Blackburn' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Blackburn_Rovers.svg'
			};
		case 'Bradford City':
			return {
				teamName: 'Bradford City AFC',
				fullName: 'Bradford City AFC' + teamNameEnding,
				displayName: 'Bradford City' + teamNameEnding,
				displayNameShort: 'Bradford' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Bradford_City.svg'
			};
		case 'Charlton Athletic':
			return {
				teamName: 'Charlton Athletic FC',
				fullName: 'Charlton Athletic FC' + teamNameEnding,
				displayName: 'Charlton Athletic' + teamNameEnding,
				displayNameShort: 'Charlton' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Charlton_Athletic.svg'
			};
		case 'Derby County':
			return {
				teamName: 'Derby County FC',
				fullName: 'Derby County FC' + teamNameEnding,
				displayName: 'Derby County' + teamNameEnding,
				displayNameShort: 'Derby' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Derby_County.svg'
			};
		case 'Durham City':
		case 'Durham':
			return {
				teamName: 'Durham City AFC',
				fullName: 'Durham City AFC' + teamNameEnding,
				displayName: 'Durham City' + teamNameEnding,
				displayNameShort: 'Durham' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Durham_City.png'
			};
		case 'Lewes':
			return {
				teamName: 'Lewes FC',
				fullName: 'Lewes FC' + teamNameEnding,
				displayName: 'Lewes' + teamNameEnding,
				displayNameShort: 'Lewes' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Lewes.png'
			};
		case 'London Bees':
			return {
				teamName: 'London Bees',
				fullName: 'London Bees' + teamNameEnding,
				displayName: 'London Bees' + teamNameEnding,
				displayNameShort: 'Bees' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'London_Bees.png'
			};
		case 'Macclesfield Town':
			return {
				teamName: 'Macclesfield Town FC',
				fullName: 'Macclesfield Town FC' + teamNameEnding,
				displayName: 'Macclesfield Town' + teamNameEnding,
				displayNameShort: 'Macclesfield' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Macclesfield_Town.svg'
			};
		case 'Middlesbrough':
			return {
				teamName: 'Middlesbrough FC',
				fullName: 'Middlesbrough FC' + teamNameEnding,
				displayName: 'Middlesbrough' + teamNameEnding,
				displayNameShort: 'Middlesbrough' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Middlesbrough.svg'
			};
		case 'Millwall Lionesses':
			return {
				teamName: 'Millwall Lionesses LFC',
				fullName: 'Millwall Lionesses LFC' + teamNameEnding,
				displayName: 'Millwall Lionesses' + teamNameEnding,
				displayNameShort: 'Lionesses' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Millwall_Lionesses.png'
			};
		case 'Northampton Town':
			return {
				teamName: 'Northampton Town FC',
				fullName: 'Northampton Town FC' + teamNameEnding,
				displayName: 'Northampton Town' + teamNameEnding,
				displayNameShort: 'Northampton' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Northampton_Town.svg'
			};
		case 'Norwich City':
			return {
				teamName: 'Norwich City FC',
				fullName: 'Norwich City FC' + teamNameEnding,
				displayName: 'Norwich City' + teamNameEnding,
				displayNameShort: 'Norwich' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Norwich_City.svg'
			};
		case 'Reading':
			return {
				teamName: 'Reading FC',
				fullName: 'Reading FC' + teamNameEnding,
				displayName: 'Reading' + teamNameEnding,
				displayNameShort: 'Reading' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Reading.svg'
			};
		case 'Scunthorpe United':
			return {
				teamName: 'Scunthorpe United FC',
				fullName: 'Scunthorpe United FC' + teamNameEnding,
				displayName: 'Scunthorpe United' + teamNameEnding,
				displayNameShort: 'Scunthorpe' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Scunthorpe_United.svg'
			};
		case 'Sheffield United':
			return {
				teamName: 'Sheffield United FC',
				fullName: 'Sheffield United FC' + teamNameEnding,
				displayName: 'Sheffield United' + teamNameEnding,
				displayNameShort: 'Sheffield' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Sheffield_United.svg'
			};
		case 'Stoke City':
			return {
				teamName: 'Stoke City FC',
				fullName: 'Stoke City FC' + teamNameEnding,
				displayName: 'Stoke City' + teamNameEnding,
				displayNameShort: 'Stoke' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Stoke_City.svg'
			};
		case 'Sunderland':
			return {
				teamName: 'Sunderland AFC',
				fullName: 'Sunderland AFC' + teamNameEnding,
				displayName: 'Sunderland' + teamNameEnding,
				displayNameShort: 'Sunderland' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Sunderland.svg'
			};
		case 'Swansea City':
			return {
				teamName: 'Swansea City AFC',
				fullName: 'Swansea City AFC' + teamNameEnding,
				displayName: 'Swansea City' + teamNameEnding,
				displayNameShort: 'Swansea' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Swansea_City.svg'
			};
		case 'West Bromwich Albion':
			return {
				teamName: 'West Bromwich Albion FC',
				fullName: 'West Bromwich Albion FC' + teamNameEnding,
				displayName: 'West Bromwich Albion' + teamNameEnding,
				displayNameShort: 'West Brom' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'West_Bromwich_Albion.svg'
			};


		/***************************************************/
		/****************** Spanish Clubs ******************/
		/***************************************************/

		case 'Atletico Madrid':
		case 'Atlético Madrid':
			return {
				teamName: 'Club Atletico de Madrid SAD',
				fullName: 'Club Atletico de Madrid' + teamNameEnding,
				displayName: 'Atletico Madrid' + teamNameEnding,
				displayNameShort: 'Atletico' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Atletico_Madrid.svg'
			};
		case 'Barcelona':
			return {
				teamName: 'FC Barcelona',
				fullName: 'FC Barcelona' + teamNameEnding,
				displayName: 'Barcelona' + teamNameEnding,
				displayNameShort: 'Barcelona' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Barcelona.svg'
			};
		case 'Real Madrid':
			return {
				teamName: 'Real Madrid CF',
				fullName: 'Real Madrid CF' + teamNameEnding,
				displayName: 'Real Madrid' + teamNameEnding,
				displayNameShort: 'Real' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Real_Madrid.svg'
			};
		case 'Sevilla':
			return {
				teamName: 'Sevilla FC',
				fullName: 'Sevilla FC' + teamNameEnding,
				displayName: 'Sevilla' + teamNameEnding,
				displayNameShort: 'Sevilla' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Sevilla.svg'
			};
		case 'Valencia':
			return {
				teamName: 'Valencia CF',
				fullName: 'Valencia CF' + teamNameEnding,
				displayName: 'Valencia' + teamNameEnding,
				displayNameShort: 'Valencia' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Valencia.svg'
			};


		/***************************************************/
		/****************** German Clubs *******************/
		/***************************************************/

		case 'Bayern Munich':
		case 'Bayern München':
			return {
				teamName: 'FC Bayern Munich',
				fullName: 'FC Bayern Munich' + teamNameEnding,
				displayName: 'Bayern Munich' + teamNameEnding,
				displayNameShort: 'Bayern' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Bayern_Munich.svg'
			};
		case 'Borussia Dortmund':
			return {
				teamName: 'Borussia Dortmund',
				fullName: 'Borussia Dortmund' + teamNameEnding,
				displayName: 'Borussia Dortmund' + teamNameEnding,
				displayNameShort: 'Dortmund' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Borussia_Dortmund.svg'
			};


		/***************************************************/
		/****************** Italian Clubs ******************/
		/***************************************************/

		case 'AC Milan':
		case 'Milan':
			return {
				teamName: 'AC Milan',
				fullName: 'AC Milan' + teamNameEnding,
				displayName: 'AC Milan' + teamNameEnding,
				displayNameShort: 'AC Milan' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'AC_Milan.svg'
			};
		case 'Inter Milan':
		case 'Internazionale':
			return {
				teamName: 'Internazionale',
				fullName: 'Internazionale' + teamNameEnding,
				displayName: 'Inter Milan' + teamNameEnding,
				displayNameShort: 'Inter' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Inter_Milan.svg'
			};
		case 'Juventus':
			return {
				teamName: 'Juventus FC',
				fullName: 'Juventus FC' + teamNameEnding,
				displayName: 'Juventus' + teamNameEnding,
				displayNameShort: 'Juventus' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Juventus.svg'
			};
		case 'Roma':
			return {
				teamName: 'AS Roma',
				fullName: 'AS Roma' + teamNameEnding,
				displayName: 'Roma' + teamNameEnding,
				displayNameShort: 'Roma' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Roma.svg'
			};


		/***************************************************/
		/****************** French Clubs *******************/
		/***************************************************/

		case 'Olympique Lyonnais':
			return {
				teamName: 'Olympique Lyonnais',
				fullName: 'Olympique Lyonnais' + teamNameEnding,
				displayName: 'Olympique Lyonnais' + teamNameEnding,
				displayNameShort: 'OL' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Olympique_Lyonnais.svg'
			};
		case 'Paris Saint-Germain':
		case 'PSG':
			return {
				teamName: 'Paris Saint-Germain FC',
				fullName: 'Paris Saint-Germain FC' + teamNameEnding,
				displayName: 'Paris Saint-Germain' + teamNameEnding,
				displayNameShort: 'PSG' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Paris_Saint-Germain.svg'
			};


		/***************************************************/
		/***************** Portugese Clubs *****************/
		/***************************************************/

		case 'Benfica':
			return {
				teamName: 'SL Benfica',
				fullName: 'SL Benfica' + teamNameEnding,
				displayName: 'Benfica' + teamNameEnding,
				displayNameShort: 'Benfica' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Benfica.svg'
			};
		case 'Porto':
			return {
				teamName: 'FC Porto',
				fullName: 'FC Porto' + teamNameEnding,
				displayName: 'Porto' + teamNameEnding,
				displayNameShort: 'Porto' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Porto.svg'
			};
		case 'Vitoria Setubal':
			return {
				teamName: 'Vitoria Setubal FC',
				fullName: 'Vitoria Setubal FC' + teamNameEnding,
				displayName: 'Vitoria Setubal' + teamNameEnding,
				displayNameShort: 'Vitoria' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Vitoria.svg'
			};


		/***************************************************/
		/******************* Dutch Clubs *******************/
		/***************************************************/

		case 'Ajax':
			return {
				teamName: 'AFC Ajax',
				fullName: 'AFC Ajax' + teamNameEnding,
				displayName: 'Ajax' + teamNameEnding,
				displayNameShort: 'Ajax' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Ajax.svg'
			};
		case 'PSV Eindhoven':
		case 'PSV':
			return {
				teamName: 'PSV Eindhoven',
				fullName: 'PSV Eindhoven' + teamNameEnding,
				displayName: 'PSV Eindhoven' + teamNameEnding,
				displayNameShort: 'PSV' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'PSV_Eindhoven.svg'
			};


		/***************************************************/
		/***************** Scottish Clubs ******************/
		/***************************************************/

		case 'Aberdeen':
			return {
				teamName: 'Aberdeen FC',
				fullName: 'Aberdeen FC' + teamNameEnding,
				displayName: 'Aberdeen' + teamNameEnding,
				displayNameShort: 'Aberdeen' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Aberdeen.svg'
			};
		case 'Celtic':
			return {
				teamName: 'Celtic FC',
				fullName: 'Celtic FC' + teamNameEnding,
				displayName: 'Celtic' + teamNameEnding,
				displayNameShort: 'Celtic' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Celtic.svg'
			};
		case 'Heart of Midlothian':
			return {
				teamName: 'Heart of Midlothian FC',
				fullName: 'Heart of Midlothian FC' + teamNameEnding,
				displayName: 'Hearts' + teamNameEnding,
				displayNameShort: 'Hearts' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Heart_of_Midlothian.svg'
			};
		case 'St Mirren':
			return {
				teamName: 'St Mirren FC',
				fullName: 'St Mirren FC' + teamNameEnding,
				displayName: 'St Mirren' + teamNameEnding,
				displayNameShort: 'St Mirren' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'St_Mirren.svg'
			};


		/***************************************************/
		/****************** Belgian Clubs ******************/
		/***************************************************/

		case 'Oostende':
			return {
				teamName: 'KV Oostende',
				fullName: 'KV Oostende' + teamNameEnding,
				displayName: 'Oostende' + teamNameEnding,
				displayNameShort: 'Oostende' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Oostende.svg'
			};


		/***************************************************/
		/******************* Swiss Clubs *******************/
		/***************************************************/

		case 'Young Boys':
			return {
				teamName: 'BSC Young Boys',
				fullName: 'BSC Young Boys' + teamNameEnding,
				displayName: 'Young Boys' + teamNameEnding,
				displayNameShort: 'Young Boys' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Young_Boys.svg'
			};


		/***************************************************/
		/****************** Ukranian Clubs ******************/
		/***************************************************/

		case 'Shakhtar Donetsk':
			return {
				teamName: 'FC Shakhtar Donetsk',
				fullName: 'FC Shakhtar Donetsk' + teamNameEnding,
				displayName: 'Shakhtar Donetsk' + teamNameEnding,
				displayNameShort: 'Shakhtar' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Shakhtar_Donetsk.svg'
			};


		/***************************************************/
		/***************** Austrian Clubs ******************/
		/***************************************************/

		case 'Ried':
			return {
				teamName: 'SV Ried',
				fullName: 'SV Ried' + teamNameEnding,
				displayName: 'SV Ried' + teamNameEnding,
				displayNameShort: 'Ried' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Ried.svg'
			};


		/***************************************************/
		/***************** American Clubs ******************/
		/***************************************************/

		case 'Club America':
			return {
				teamName: 'Club de Futbol America S.A. de C.V.',
				fullName: 'Club America' + teamNameEnding,
				displayName: 'Club America' + teamNameEnding,
				displayNameShort: 'America' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Club_America.svg'
			};
		case 'San Jose Earthquakes':
			return {
				teamName: 'San Jose Earthquakes',
				fullName: 'San Jose Earthquakes' + teamNameEnding,
				displayName: 'San Jose Earthquakes' + teamNameEnding,
				displayNameShort: 'Quakes' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'San_Jose_Earthquakes.svg'
			};
	}

	// Return default club data
	return {
		teamName: clubName,
		fullName: clubName + teamNameEnding,
		displayName: displayName + teamNameEnding,
		displayNameShort: displayName + teamNameEnding,
		clubLogoSrc: CLUB_LOGOS_FOLDER + 'defaultCrest.png'
	};
}
