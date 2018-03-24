import CellMap from 'module/CellMap';

export default class DijkstraMap extends CellMap {
	calculate() {
		let cellsToProcess = [];
		let visitedCells = [];

		this.forEachCell((cell) => {
			if (cell.passable) {
				cellsToProcess.push(cell);
			}
		});

		while (cellsToProcess.length) {
			let cell = findCellWithSmallestWeight(cellsToProcess);
			cellsToProcess.splice(cellsToProcess.indexOf(cell), 1);

			let neighbours = this.findNeighbours(cell.position).filter(cell => cell.passable);
			neighbours.forEach((neighbour) => {
				if (cell.weight + 1 < neighbour.weight) {
					neighbour.weight = cell.weight + 1;
				}
			});

			visitedCells.push(cell);
		}
	}

	findPath(fromPosition, callback) {
		let neighbours = this.findNeighbours(fromPosition);
		let currentCell = this.findCellAtPosition(fromPosition);
		let cellWithSmallestDistance = findCellWithSmallestWeight(neighbours);

		if (cellWithSmallestDistance.weight < currentCell.weight) {
			callback(cellWithSmallestDistance.position);
			this.findPath(cellWithSmallestDistance.position, callback);
		}
	}
}

function findCellWithSmallestWeight(cells) {
	let cellWithSmallestDistance;

	cells.forEach((cell) => {
		if (!cellWithSmallestDistance || cellWithSmallestDistance.weight > cell.weight) {
			cellWithSmallestDistance = cell;
		}
	});

	return cellWithSmallestDistance;
}
