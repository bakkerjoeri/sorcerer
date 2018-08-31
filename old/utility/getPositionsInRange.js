export default function getPositionsInRange(position, offset) {
	let positions = [];

	for (let y = position.y; y < position.y + offset.height; y = y + 1) {
		for (let x = position.x; x < position.x + offset.width; x = x + 1) {
			positions.push({
				x: x,
				y: y,
			});
		}
	}

	return positions;
}
