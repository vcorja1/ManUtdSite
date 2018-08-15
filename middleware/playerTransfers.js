// Country flag images location
const FLAG_IMG_FOLDER = 'img/flags/';
// Club logo images location
const CLUB_LOGO_FOLDER = 'img/clubLogos/';
const ENGLAND_FLAG = FLAG_IMG_FOLDER + 'england.svg';

// Data for export - Recent transfers
exports.incomingPlayers = [
	{ name: 'Diogo Dalot', flagImg: FLAG_IMG_FOLDER + 'pt.svg', position: 'RB', prevClub: 'FC Porto', crestURI: CLUB_LOGO_FOLDER + 'Porto.png' },
	{ name: 'Fred', flagImg: FLAG_IMG_FOLDER + 'br.svg', position: 'CM', prevClub: 'Shakhtar Donetsk', crestURI: CLUB_LOGO_FOLDER + 'Shakhtar_Donetsk.png' },
	{ name: 'Lee Grant', flagImg: FLAG_IMG_FOLDER + 'eg.svg', position: 'GK', prevClub: 'Stoke City', crestURI: CLUB_LOGO_FOLDER + 'Stoke_City.svg' }
];

exports.academySignings = [
	{ name: 'Ondrej Mastny', flagImg: FLAG_IMG_FOLDER + 'cz.svg', position: 'GK', prevClub: 'FC Vysocina Jihlava', crestURI: CLUB_LOGO_FOLDER + 'Vysocina_Jihlava.svg' },
	{ name: 'Harvey Neville', flagImg: ENGLAND_FLAG, position: 'CM', prevClub: 'Valencia', crestURI: CLUB_LOGO_FOLDER + 'Valencia.svg' },
	{ name: 'Charlie McCann', flagImg: ENGLAND_FLAG, position: 'CM', prevClub: 'Coventry City', crestURI: CLUB_LOGO_FOLDER + 'Coventry_City.svg' },
	{ name: 'Reece Devine', flagImg: ENGLAND_FLAG, position: 'LB', prevClub: 'Manchester City', crestURI: CLUB_LOGO_FOLDER + 'Manchester_City.svg' },
	{ name: 'Connor Stanley', flagImg: ENGLAND_FLAG, position: 'RW', prevClub: 'Birmingham City', crestURI: CLUB_LOGO_FOLDER + 'Birmingham_City.svg' },
];

exports.departingPlayers = [
	{ name: 'Michael Carrick', flagImg: ENGLAND_FLAG, position: 'CM', reason: 'Retired' },
	{ name: 'Daley Blind', flagImg: FLAG_IMG_FOLDER + 'nl.svg', position: 'LB', nextClub: 'AFC Ajax', crestURI: CLUB_LOGO_FOLDER + 'Ajax.svg' },
	{ name: 'Sam Johnstone', flagImg: ENGLAND_FLAG, position: 'GK', nextClub: 'West Bromwich Albion', crestURI: CLUB_LOGO_FOLDER + 'West_Bromwich_Albion.svg' },
	{ name: 'Indy Boonen', flagImg: FLAG_IMG_FOLDER + 'be.svg', position: 'RW', nextClub: 'KV Oostende', crestURI: CLUB_LOGO_FOLDER + 'Oostende.png' },
	{ name: 'Joe Riley', flagImg: ENGLAND_FLAG, position: 'RB', nextClub: 'Bradford City', crestURI: CLUB_LOGO_FOLDER + 'Bradford_City.png' },
	{ name: 'Max Johnstone', flagImg: ENGLAND_FLAG, position: 'GK', reason: 'Released' },
	{ name: 'Ilias Moutha-Sebtaoui', flagImg: FLAG_IMG_FOLDER + 'be.svg', position: 'GK', reason: 'Released' },
	{ name: 'Theo Richardson', flagImg: ENGLAND_FLAG, position: 'GK', reason: 'Released' },
	{ name: 'Devonte Redmond', flagImg: ENGLAND_FLAG, position: 'CM', reason: 'Released' },
	{ name: 'Jake Kenyon', flagImg: ENGLAND_FLAG, position: 'CM', reason: 'Released' },
	{ name: 'Charlie Scott', flagImg: ENGLAND_FLAG, position: 'CM', reason: 'Released' }
];

exports.loanedPlayers = [
	{ name: 'Joel Pereira', flagImg: ENGLAND_FLAG, position: 'GK', nextClub: 'Vitoria Setubal', crestURI: CLUB_LOGO_FOLDER + 'Vitoria.svg' },
	{ name: 'Axel Tuanzebe', flagImg: ENGLAND_FLAG, position: 'CB', nextClub: 'Aston Villa', crestURI: CLUB_LOGO_FOLDER + 'Aston_Villa.svg' },
	{ name: 'Timothy Fosu-Mensah', flagImg: FLAG_IMG_FOLDER + 'nl.svg', position: 'RB', nextClub: 'Fulham', crestURI: CLUB_LOGO_FOLDER + 'Fulham.svg' },
	{ name: 'Dean Henderson', flagImg: ENGLAND_FLAG, position: 'GK', nextClub: 'Sheffield United', crestURI: CLUB_LOGO_FOLDER + 'Sheffield_United.svg' },
	{ name: 'Kieran O\'Hara', flagImg: ENGLAND_FLAG, position: 'GK', nextClub: 'Macclesfield Town', crestURI: CLUB_LOGO_FOLDER + 'Macclesfield_Town.svg' },
	{ name: 'Matthew Willock', flagImg: ENGLAND_FLAG, position: 'CM', nextClub: 'St Mirren', crestURI: CLUB_LOGO_FOLDER + 'St_Mirren.svg' },
	{ name: 'Cameron Borthwick-Jackson', flagImg: ENGLAND_FLAG, position: 'LB', nextClub: 'Scunthorpe United', crestURI: CLUB_LOGO_FOLDER + 'Scunthorpe_United.svg' },
	{ name: 'James Wilson', flagImg: ENGLAND_FLAG, position: 'ST', nextClub: 'Aberdeen', crestURI: CLUB_LOGO_FOLDER + 'Aberdeen.svg' }
];

// Data for export - World Cup participants
exports.worldCupParticipants = [
	{ country: 'Argentina', flagImg: FLAG_IMG_FOLDER + 'ar.svg', playerNames: 'Marcos Rojo' },
	{ country: 'Belgium', flagImg: FLAG_IMG_FOLDER + 'be.svg', playerNames: 'Marouane Fellaini, Romelu Lukaku' },
	{ country: 'Brazil', flagImg: FLAG_IMG_FOLDER + 'br.svg', playerNames: 'Fred' },
	{ country: 'England', flagImg: ENGLAND_FLAG, playerNames: 'Phil Jones, Jesse Lingard, Marcus Rashford, Ashley Young' },
	{ country: 'France', flagImg: FLAG_IMG_FOLDER + 'fr.svg', playerNames: 'Paul Pogba' },
	{ country: 'Serbia', flagImg: FLAG_IMG_FOLDER + 'rs.svg', playerNames: 'Nemanja Matic' },
	{ country: 'Spain', flagImg: FLAG_IMG_FOLDER + 'es.svg', playerNames: 'David De Gea' },
	{ country: 'Sweden', flagImg: FLAG_IMG_FOLDER + 'se.svg', playerNames: 'Victor Lindelof' }
];
