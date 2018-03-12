// Returns the status for the given fixture
exports.getFixtureStatus = function getFixtureStatus(status) {
	const fixtureStatus = [
		'SCHEDULED', 'TIMED', 'POSTPONED', 'CANCELED', 'IN_PLAY', 'FINISHED'
	];

	return fixtureStatus[status];
}

// Returns the status for the given fixture
exports.convertFixtureStatusToID = function convertFixtureStatusToID(status) {
	const fixtureStatus = [
		'SCHEDULED', 'TIMED', 'POSTPONED', 'CANCELED', 'IN_PLAY', 'FINISHED'
	];

	return fixtureStatus.indexOf(status);
}

// Returns the name of the competition based on the ID
exports.getCompetitionName = function getCompetitionName(competitionID) {
	const competitions = [
		'Premier League', 'FA Cup', 'Carabao Cup', 'Community Shield', 'Champions League', 'Europa League',
		'UEFA Super Cup', 'FIFA Club World Cup', 'International Champions Cup', 'Friendly', 'Premier League 2',
		'Premier League International Cup', 'Under-19 UEFA Youth League', 'Under-18 Premier League North',
		'Premier League Cup', 'FA Youth Cup'
	];

	return competitions[competitionID];
}
