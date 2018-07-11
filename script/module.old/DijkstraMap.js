import CellMap from 'module/CellMap';

export default class DijkstraMap extends CellMap {
	calculate() {
		let visitedCells = [];
		let cellsToProcess = this.cells.filter(cell => cell.passable);

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
	if (cells.length === 0) {
		throw new Error('Cannot find cell with smallest weight from an array with 0 cells.');
	}

	cells.sort((a, b) => a.weight - b.weight);

	return cells[0];
}
