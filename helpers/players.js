// Returns the status for the given fixture
exports.getPositionAbbr = function getPositionAbbr(position) {
	const positionAbbr = [
		'GK', 'CB', 'RB', 'LB', 'DM', 'CM', 'AM', 'RW', 'LW', 'ST'
	];

	return positionAbbr[position];
}