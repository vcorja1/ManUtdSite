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
	if(team === TEAMS.RESERVES) {
		switch(competition) {
			case COMPETITIONS.U19_UEFA_YOUTH_LEAGUE:
				return ' U19';
			case COMPETITIONS.EFL_TROPHY:
				return ' U21';
			default:
				return ' U23';
		}
	}
	if(team === TEAMS.ACADEMY) {
		return ' U18';
	}
	return '';
}


// Removes tags like 'FC' from the name
function removeTeamNameAbbr(teamName) {
	// Keep some names as they are
	if (teamName === 'Toronto FC') {
		return teamName;
	}

	// Otherwise remove ending
	let removableAbrr = [' FC', ' CF', ' SC', ' IF', ' IL', ' BK', ' KV', ' CP', ' UD'];
	let ending = teamName.substr(-3);
	if(removableAbrr.includes(ending)) {
		return teamName.slice(0, -3);
	}
	removableAbrr = [' AFC', ' LFC', ' WFC'];
	ending = teamName.substr(-4);
	if(removableAbrr.includes(ending)) {
		return teamName.slice(0, -4);
	}

	// Or remove beginning
	removableAbrr = ['AS ', 'FC ', 'FK ', 'KV ', 'SE ', 'SK ', 'SL ', 'SM ', 'SV ', 'UC '];
	let start = teamName.substr(0,3);
	if(removableAbrr.includes(start)) {
		return teamName.substr(3);
	}
	removableAbrr = ['AFC ', 'ACS ', 'BSC ', 'RSC ', 'VfL '];
	start = teamName.substr(0,4);
	if(removableAbrr.includes(start)) {
		return teamName.substr(4);
	}

	// Special cases below
	if(teamName === '1.FSV Mainz 05') {
		return 'Mainz 05';
	}

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
			};

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
			};


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
		case 'Brighton':
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
		case 'Bolton Wanderers':
		case 'Bolton':
			return {
				teamName: 'Bolton Wanderers FC',
				fullName: 'Bolton Wanderers FC' + teamNameEnding,
				displayName: 'Bolton Wanderers' + teamNameEnding,
				displayNameShort: 'Bolton' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Bolton_Wanderers.svg'
			};
		case 'Bradford City':
			return {
				teamName: 'Bradford City AFC',
				fullName: 'Bradford City AFC' + teamNameEnding,
				displayName: 'Bradford City' + teamNameEnding,
				displayNameShort: 'Bradford' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Bradford_City.svg'
			};
		case 'Brentford':
			return {
				teamName: 'Brentford FC',
				fullName: 'Brentford FC' + teamNameEnding,
				displayName: 'Brentford' + teamNameEnding,
				displayNameShort: 'Brentford' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Brentford.svg'
			};
		case 'Bristol City':
			return {
				teamName: 'Bristol City FC',
				fullName: 'Bristol City FC' + teamNameEnding,
				displayName: 'Bristol City' + teamNameEnding,
				displayNameShort: 'Bristol' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Bristol_City.svg'
			};
		case 'Burton Albion':
			return {
				teamName: 'Burton Albion FC',
				fullName: 'Burton Albion FC' + teamNameEnding,
				displayName: 'Burton Albion' + teamNameEnding,
				displayNameShort: 'Burton' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Burton_Albion.svg'
			};
		case 'Charlton Athletic':
			return {
				teamName: 'Charlton Athletic FC',
				fullName: 'Charlton Athletic FC' + teamNameEnding,
				displayName: 'Charlton Athletic' + teamNameEnding,
				displayNameShort: 'Charlton' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Charlton_Athletic.svg'
			};
		case 'Colchester United':
			return {
				teamName: 'Colchester United FC',
				fullName: 'Colchester United FC' + teamNameEnding,
				displayName: 'Colchester United' + teamNameEnding,
				displayNameShort: 'Colchester' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Colchester_United.svg'
			};
		case 'Crewe Alexandra':
			return {
				teamName: 'Crewe Alexandra FC',
				fullName: 'Crewe Alexandra FC' + teamNameEnding,
				displayName: 'Crewe Alexandra' + teamNameEnding,
				displayNameShort: 'Crewe Alexandra' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Crewe_Alexandra.svg'
			};
		case 'Doncaster Rovers':
			return {
				teamName: 'Doncaster Rovers FC',
				fullName: 'Doncaster Rovers FC' + teamNameEnding,
				displayName: 'Doncaster Rovers' + teamNameEnding,
				displayNameShort: 'Doncaster' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Doncaster_Rovers.svg'
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
		case 'Leeds United':
			return {
				teamName: 'Leeds United FC',
				fullName: 'Leeds United FC' + teamNameEnding,
				displayName: 'Leeds United' + teamNameEnding,
				displayNameShort: 'Leeds' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Leeds_United.svg'
			};
		case 'Lewes':
			return {
				teamName: 'Lewes FC',
				fullName: 'Lewes FC' + teamNameEnding,
				displayName: 'Lewes' + teamNameEnding,
				displayNameShort: 'Lewes' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Lewes.png'
			};
		case 'Lincoln City':
			return {
				teamName: 'Lincoln City FC',
				fullName: 'Lincoln City FC' + teamNameEnding,
				displayName: 'Lincoln City' + teamNameEnding,
				displayNameShort: 'Lincoln City' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Lincoln_City.svg'
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
		case 'Morecambe':
			return {
				teamName: 'Morecambe FC',
				fullName: 'Morecambe FC' + teamNameEnding,
				displayName: 'Morecambe' + teamNameEnding,
				displayNameShort: 'Morecambe' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Morecambe.png'
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
		case 'Nottingham Forest':
			return {
				teamName: 'Nottingham Forest FC',
				fullName: 'Nottingham Forest FC' + teamNameEnding,
				displayName: 'Nottingham Forest' + teamNameEnding,
				displayNameShort: 'Nottingham Forest' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Nottingham_Forest.svg'
			};
		case 'Oldham Athletic':
			return {
				teamName: 'Oldham Athletic AFC',
				fullName: 'Oldham Athletic AFC' + teamNameEnding,
				displayName: 'Oldham Athletic' + teamNameEnding,
				displayNameShort: 'Oldham' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Oldham_Athletic.svg'
			};
		case 'Preston North End':
			return {
				teamName: 'Preston North End FC',
				fullName: 'Preston North End FC' + teamNameEnding,
				displayName: 'Preston North End' + teamNameEnding,
				displayNameShort: 'The North End' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Preston_North_End.svg'
			};
		case 'Reading':
			return {
				teamName: 'Reading FC',
				fullName: 'Reading FC' + teamNameEnding,
				displayName: 'Reading' + teamNameEnding,
				displayNameShort: 'Reading' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Reading.svg'
			};
		case 'Rochdale':
			return {
				teamName: 'Rochdale AFC',
				fullName: 'Rochdale AFC' + teamNameEnding,
				displayName: 'Rochdale' + teamNameEnding,
				displayNameShort: 'Rochdale' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Rochdale.png'
			};
		case 'Rotherham United':
			return {
				teamName: 'Rotherham United FC',
				fullName: 'Rotherham United FC' + teamNameEnding,
				displayName: 'Rotherham United' + teamNameEnding,
				displayNameShort: 'Rotherham United' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Rotherham_United.svg'
			};
		case 'Salford City':
			return {
				teamName: 'Salford City FC',
				fullName: 'Salford City FC' + teamNameEnding,
				displayName: 'Salford City' + teamNameEnding,
				displayNameShort: 'Salford' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Salford_City.svg'
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
		case 'Southend United':
			return {
				teamName: 'Southend United FC',
				fullName: 'Southend United FC' + teamNameEnding,
				displayName: 'Southend United' + teamNameEnding,
				displayNameShort: 'Southend' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Southend_United.svg'
			};
		case 'Stalybridge Celtic':
			return {
				teamName: 'Stalybridge Celtic FC',
				fullName: 'Stalybridge Celtic FC' + teamNameEnding,
				displayName: 'Stalybridge Celtic' + teamNameEnding,
				displayNameShort: 'Stalybridge Celtic' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Stalybridge_Celtic.png'
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
		case 'Swindon Town':
			return {
				teamName: 'Swindon Town FC',
				fullName: 'Swindon Town FC' + teamNameEnding,
				displayName: 'Swindon Town' + teamNameEnding,
				displayNameShort: 'Swindon' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Swindon_Town.svg'
			};
		case 'Tranmere Rovers':
			return {
				teamName: 'Tranmere Rovers FC',
				fullName: 'Tranmere Rovers FC' + teamNameEnding,
				displayName: 'Tranmere Rovers' + teamNameEnding,
				displayNameShort: 'Tranmere' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Tranmere_Rovers.svg'
			};
		case 'West Bromwich Albion':
			return {
				teamName: 'West Bromwich Albion FC',
				fullName: 'West Bromwich Albion FC' + teamNameEnding,
				displayName: 'West Bromwich Albion' + teamNameEnding,
				displayNameShort: 'West Brom' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'West_Bromwich_Albion.svg'
			};
		case 'Wigan Athletic':
			return {
				teamName: 'Wigan Athletic FC',
				fullName: 'Wigan Athletic FC' + teamNameEnding,
				displayName: 'Wigan Athletic' + teamNameEnding,
				displayNameShort: 'Wigan' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Wigan_Athletic.svg'
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
		case 'Levante':
			return {
				teamName: 'Levante Unión Deportiva, S.A.D.',
				fullName: 'Levante UD' + teamNameEnding,
				displayName: 'Levante' + teamNameEnding,
				displayNameShort: 'Levante' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Levante.svg'
			};
		case 'Real Madrid':
			return {
				teamName: 'Real Madrid CF',
				fullName: 'Real Madrid CF' + teamNameEnding,
				displayName: 'Real Madrid' + teamNameEnding,
				displayNameShort: 'Real' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Real_Madrid.svg'
			};
		case 'Real Zaragoza':
			return {
				teamName: 'Real Zaragoza, S.A.D.',
				fullName: 'Real Zaragoza' + teamNameEnding,
				displayName: 'Real Zaragoza' + teamNameEnding,
				displayNameShort: 'Zaragoza' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Real_Zaragoza.svg'
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
		case 'FFC Frankfurt':
			return {
				teamName: 'FFC Frankfurt',
				fullName: 'FFC Frankfurt' + teamNameEnding,
				displayName: 'FFC Frankfurt' + teamNameEnding,
				displayNameShort: 'FFC Frankfurt' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'FFC_Frankfurt.svg'
			};
		case 'Fortuna Dusseldorf':
			return {
				teamName: 'Dusseldorfer Turn-und Sportverein Fortuna 1895 e.V.',
				fullName: 'Fortuna Dusseldorf' + teamNameEnding,
				displayName: 'Fortuna Dusseldorf' + teamNameEnding,
				displayNameShort: 'Fortuna' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Fortuna_Dusseldorf.svg'
			};
		case 'Koln':
			return {
				teamName: 'FC Koln',
				fullName: 'FC Koln' + teamNameEnding,
				displayName: 'Koln' + teamNameEnding,
				displayNameShort: 'Koln' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Koln.svg'
			};
		case 'Werder':
		case 'Werder Bremen':
			return {
				teamName: 'Sportverein Werder Bremen von 1899 e. V.',
				fullName: 'Werder Bremen' + teamNameEnding,
				displayName: 'Werder Bremen' + teamNameEnding,
				displayNameShort: 'Werder' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Werder_Bremen.svg'
			};
		case 'Wolfsburg':
			return {
				teamName: 'Verein fur Leibesubungen Wolfsburg e. V.',
				fullName: 'VfL Wolfsburg' + teamNameEnding,
				displayName: 'Wolfsburg' + teamNameEnding,
				displayNameShort: 'Wolfsburg' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Wolfsburg.svg'
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
		case 'Fiorentina':
			return {
				teamName: 'ACS Fiorentina',
				fullName: 'ACS Fiorentina' + teamNameEnding,
				displayName: 'Fiorentina' + teamNameEnding,
				displayNameShort: 'Fiorentina' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Fiorentina.svg'
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
		case 'Parma':
			return {
				teamName: 'Parma Calcio 1913',
				fullName: 'Parma' + teamNameEnding,
				displayName: 'Parma' + teamNameEnding,
				displayNameShort: 'Parma' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Parma.png'
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

		case 'Amiens':
			return {
				teamName: 'Amiens SC',
				fullName: 'Amiens SC' + teamNameEnding,
				displayName: 'Amiens' + teamNameEnding,
				displayNameShort: 'Amiens' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Amiens.svg'
			};
		case 'Caen':
			return {
				teamName: 'Stade Malherbe Caen',
				fullName: 'SM Caen' + teamNameEnding,
				displayName: 'Caen' + teamNameEnding,
				displayNameShort: 'Caen' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Caen.svg'
			};
		case 'Monaco':
			return {
				teamName: 'Association Sportive de Monaco Football Club',
				fullName: 'AS Monaco' + teamNameEnding,
				displayName: 'AS Monaco' + teamNameEnding,
				displayNameShort: 'Monaco' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'AS_Monaco.svg'
			};
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
		case 'Sporting':
			return {
				teamName: 'Sporting Clube de Portugal',
				fullName: 'Sporting CP' + teamNameEnding,
				displayName: 'Sporting' + teamNameEnding,
				displayNameShort: 'Sporting' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Sporting.svg'
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
		case 'AZ':
		case 'AZ Alkmaar':
			return {
				teamName: 'Alkmaar Zaanstreek',
				fullName: 'AZ Alkmaar' + teamNameEnding,
				displayName: 'AZ Alkmaar' + teamNameEnding,
				displayNameShort: 'AZ Alkmaar' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'AZ_Alkmaar.svg'
			};
		case 'NAC Breda':
			return {
				teamName: 'NAC Breda',
				fullName: 'NAC Breda' + teamNameEnding,
				displayName: 'NAC Breda' + teamNameEnding,
				displayNameShort: 'NAC' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'NAC_Breda.png'
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
		case 'Glasgow City':
			return {
				teamName: 'Glasgow City FC',
				fullName: 'Glasgow City FC' + teamNameEnding,
				displayName: 'Glasgow City' + teamNameEnding,
				displayNameShort: 'Glasgow City' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Glasgow_City.jpg'
			};
		case 'Heart of Midlothian':
			return {
				teamName: 'Heart of Midlothian FC',
				fullName: 'Heart of Midlothian FC' + teamNameEnding,
				displayName: 'Hearts' + teamNameEnding,
				displayNameShort: 'Hearts' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Heart_of_Midlothian.svg'
			};
		case 'Rangers':
			return {
				teamName: 'Rangers FC',
				fullName: 'Rangers FC' + teamNameEnding,
				displayName: 'Rangers' + teamNameEnding,
				displayNameShort: 'Rangers' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Rangers.svg'
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
		/************** Northern Irish Clubs ***************/
		/***************************************************/

		case 'Ballymena United':
			return {
				teamName: 'Ballymena United FC',
				fullName: 'Ballymena United FC' + teamNameEnding,
				displayName: 'Ballymena United' + teamNameEnding,
				displayNameShort: 'Ballymena United' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Ballymena_United.png'
			};


		/***************************************************/
		/****************** Belgian Clubs ******************/
		/***************************************************/

		case 'Club Brugge':
			return {
				teamName: 'Club Brugge KV',
				fullName: 'Club Brugge KV' + teamNameEnding,
				displayName: 'Club Brugge' + teamNameEnding,
				displayNameShort: 'Club Brugge' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Club_Brugge.svg'
			};
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

		case 'Basel':
			return {
				teamName: 'FC Basel 1893',
				fullName: 'FC Basel' + teamNameEnding,
				displayName: 'Basel' + teamNameEnding,
				displayNameShort: 'Basel' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Basel.svg'
			};
		case 'Young Boys':
			return {
				teamName: 'BSC Young Boys',
				fullName: 'BSC Young Boys' + teamNameEnding,
				displayName: 'Young Boys' + teamNameEnding,
				displayNameShort: 'Young Boys' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Young_Boys.svg'
			};


		/***************************************************/
		/****************** Swedish Clubs ******************/
		/***************************************************/

		case 'Hammarby':
			return {
				teamName: 'Hammarby Fotboll',
				fullName: 'Hammarby IF' + teamNameEnding,
				displayName: 'Hammarby' + teamNameEnding,
				displayNameShort: 'Hammarby' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Hammarby.svg'
			};
		case 'IF Brommapojkarna':
			return {
				teamName: 'Idrottsforeningen Brommapojkarna',
				fullName: 'IF Brommapojkarna' + teamNameEnding,
				displayName: 'IF Brommapojkarna' + teamNameEnding,
				displayNameShort: 'IF Brommapojkarna' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'IF_Brommapojkarna.svg'
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

		case 'Austria Wien':
		case 'Austria Vienna':
			return {
				teamName: 'Fubballklub Austria Wien',
				fullName: 'FK Austria Wien' + teamNameEnding,
				displayName: 'Austria Wien' + teamNameEnding,
				displayNameShort: 'Austria Wien' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Austria_Wien.svg'
			};
		case 'LASK':
			return {
				teamName: 'Linzer Athletik-Sport-Klub',
				fullName: 'LASK' + teamNameEnding,
				displayName: 'LASK' + teamNameEnding,
				displayNameShort: 'LASK' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'LASK.svg'
			};
		case 'Mattersburg':
			return {
				teamName: 'SV Mattersburg',
				fullName: 'SV Mattersburg' + teamNameEnding,
				displayName: 'SV Mattersburg' + teamNameEnding,
				displayNameShort: 'Mattersburg' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Mattersburg.svg'
			};
		case 'Rapid Wien':
			return {
				teamName: 'SK Rapid Wien',
				fullName: 'SK Rapid Wien' + teamNameEnding,
				displayName: 'Rapid Wien' + teamNameEnding,
				displayNameShort: 'Rapid' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Rapid_Wien.svg'
			};
		case 'Ried':
			return {
				teamName: 'SV Ried',
				fullName: 'SV Ried' + teamNameEnding,
				displayName: 'SV Ried' + teamNameEnding,
				displayNameShort: 'Ried' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Ried.svg'
			};


		/***************************************************/
		/**************** Norwegian Clubs ******************/
		/***************************************************/

		case 'Kolbotn':
			return {
				teamName: 'Kolbotn IL Fotball',
				fullName: 'Kolbotn IL' + teamNameEnding,
				displayName: 'Kolbotn' + teamNameEnding,
				displayNameShort: 'Kolbotn' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Kolbotn.svg'
			};
		case 'Kristiansund':
			return {
				teamName: 'Kristiansund Ballklubb',
				fullName: 'Kristiansund BK' + teamNameEnding,
				displayName: 'Kristiansund' + teamNameEnding,
				displayNameShort: 'Kristiansund' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Kristiansund.png'
			};
		case 'Sandefjord':
			return {
				teamName: 'Sandefjord Fotball',
				fullName: 'Sandefjord Fotball' + teamNameEnding,
				displayName: 'Sandefjord' + teamNameEnding,
				displayNameShort: 'Sandefjord' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Sandefjord.svg'
			};
		case 'Tromso':
			return {
				teamName: 'Tromso Idrettslag',
				fullName: 'Tromso IL' + teamNameEnding,
				displayName: 'Tromso' + teamNameEnding,
				displayNameShort: 'Tromso' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Tromso.svg'
			};
		case 'Valerenga':
			return {
				teamName: 'Valerenga Fotball',
				fullName: 'Valerenga Fotball' + teamNameEnding,
				displayName: 'Valerenga' + teamNameEnding,
				displayNameShort: 'Valerenga' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Valerenga.svg'
			};


		/***************************************************/
		/******************* Czech Clubs *******************/
		/***************************************************/

		case 'Sigma Olomouc':
			return {
				teamName: 'SK Sigma Olomouc',
				fullName: 'SK Sigma Olomouc' + teamNameEnding,
				displayName: 'Sigma Olomouc' + teamNameEnding,
				displayNameShort: 'Olomouc' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Sigma_Olomouc.svg'
			};


		/***************************************************/
		/***************** Serbian Clubs *******************/
		/***************************************************/

		case 'Partizan':
			return {
				teamName: 'FK Partizan',
				fullName: 'FK Partizan' + teamNameEnding,
				displayName: 'Partizan' + teamNameEnding,
				displayNameShort: 'Partizan' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Partizan.svg'
			};


		/***************************************************/
		/****************** Slovak Clubs *******************/
		/***************************************************/

		case '1. FC Tatran Presov':
			return {
				teamName: '1. FC Tatran Presov',
				fullName: '1. FC Tatran Presov' + teamNameEnding,
				displayName: 'Tatran Presov' + teamNameEnding,
				displayNameShort: 'Tatran Presov' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Tatran_Presov.png'
			};


		/***************************************************/
		/****************** Kazakh Clubs *******************/
		/***************************************************/

		case 'Astana':
			return {
				teamName: 'FC Astana',
				fullName: 'FC Astana' + teamNameEnding,
				displayName: 'Astana' + teamNameEnding,
				displayNameShort: 'Astana' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Astana.svg'
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


		/***************************************************/
		/**************** Brazilian Clubs ******************/
		/***************************************************/

		case 'Palmeiras':
			return {
				teamName: 'Sociedade Esportiva Palmeiras',
				fullName: 'SE Palmeiras' + teamNameEnding,
				displayName: 'SE Palmeiras' + teamNameEnding,
				displayNameShort: 'Palmeiras' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Palmeiras.svg'
			};


		/***************************************************/
		/***************** Mexican Clubs *******************/
		/***************************************************/

		case 'Guadalajara':
			return {
				teamName: 'Club Deportivo Guadalajara S.A. de C.V.',
				fullName: 'CD Guadalajara' + teamNameEnding,
				displayName: 'Guadalajara' + teamNameEnding,
				displayNameShort: 'Guadalajara' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Guadalajara.svg'
			};


		/***************************************************/
		/**************** Australian Clubs *****************/
		/***************************************************/

		case 'Perth Glory':
			return {
				teamName: 'Perth Glory FC',
				fullName: 'Perth Glory FC' + teamNameEnding,
				displayName: 'Perth Glory' + teamNameEnding,
				displayNameShort: 'Perth Glory' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Perth_Glory.svg'
			};


		/***************************************************/
		/***************** Chinese Clubs *******************/
		/***************************************************/

		case 'Shanghai Shenhua':
			return {
				teamName: 'Shanghai Greenland Shenhua FC',
				fullName: 'Shanghai Shenhua FC' + teamNameEnding,
				displayName: 'Shanghai Shenhua' + teamNameEnding,
				displayNameShort: 'Shanghai Shenhua' + teamNameEnding,
				clubLogoSrc: CLUB_LOGOS_FOLDER + 'Shanghai_Shenhua.svg'
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

};
