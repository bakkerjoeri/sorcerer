export default class DijkstraMap {
	constructor(size) {
		this.cellMap = createCellMapWithSize(size);
	}
	
	findPath(startingPosition, callback) {
		let neighbours = this.findNeighbours(startingPosition);
		let currentCell = this.findCellAtPosition(startingPosition);
		let cellWithSmallestDistance = this.findCellWithSmallestDistance(neighbours);
		
		if (cellWithSmallestDistance.weight < currentCell.weight) {
			callback(cellWithSmallestDistance.position);
			this.findPath(cellWithSmallestDistance.position, callback);
		}
	}
	
	calculate() {
		let cellsToProcess = [];
		let visitedCells = [];
		
		this.forEachCell((cell) => {
			if (cell.passable) {
				cellsToProcess.push(cell);
			}
		});
		
		while (cellsToProcess.length) {
			let cell = this.findCellWithSmallestDistance(cellsToProcess);
			cellsToProcess.splice(cellsToProcess.indexOf(cell), 1);
			
			let neighbours = this.findNeighbours(cell.position);
			neighbours.forEach((neighbour) => {	
					if (cell.weight + 1 < neighbour.weight) {
						neighbour.weight = cell.weight + 1;
					}
			});
			
			visitedCells.push(cell);
		}
	}
	
	findCellWithSmallestDistance(cells) {
		let cellWithSmallestDistance;
		
		cells.forEach((cell) => {
			if (!cellWithSmallestDistance || cellWithSmallestDistance.weight > cell.weight) {
				cellWithSmallestDistance = cell;
			}
		});
		
		return cellWithSmallestDistance;
	}
	
	draw() {
		let lines = [];
		
		this.forEachCell((cell, index) => {
			lines[index] = `${(lines[index] || '')}${!cell.passable ? ' #' : cell.weight === Infinity ? ' .' : cell.weight.toString().length === 1 ? ` ${cell.weight}` : cell.weight} `;
		});
		
		let grid = '';
		
		lines.forEach((line) => {
			grid = `${grid}${line}\n`;
		});
		
		console.log(grid);
	}
	
	findNeighbours(position) {
		let neighbours = [];
		
		if (this.hasCellAtPosition({x: position.x, y: position.y - 1})) {
			let north = this.findCellAtPosition({x: position.x, y: position.y - 1});
			
			if (north.passable) {
				neighbours.push(north);
			}
		}
		
		if (this.hasCellAtPosition({x: position.x + 1, y: position.y})) {
			let east = this.findCellAtPosition({x: position.x + 1, y: position.y});
			
			if (east.passable) {
				neighbours.push(east);
			}
		}
		
		if (this.hasCellAtPosition({x: position.x, y: position.y + 1})) {
			let south = this.findCellAtPosition({x: position.x, y: position.y + 1});
			
			if (south.passable) {
				neighbours.push(south);
			}
		}
		
		if (this.hasCellAtPosition({x: position.x - 1, y: position.y})) {
			let west = this.findCellAtPosition({x: position.x - 1, y: position.y});
			
			if (west.passable) {
				neighbours.push(west);
			}
		}
		
		return neighbours;
	}
	
	forEachCell(callback) {
		this.cellMap.forEach((row) => {
			row.forEach((cell, index) => {
				callback(cell, index)
			});
		});
	}
	
	findCellAtPosition(position) {
		return this.cellMap[position.x][position.y];
	}
	
	hasCellAtPosition(position) {
		return this.cellMap[position.x] && this.cellMap[position.x][position.y];
	}
}

class DijkstraCell {
	constructor(position, weight = Infinity, passable = true) {
		this.weight = weight;
		this.passable = passable;
		this.position = position;
	}
	
	setWeight(weight) {
		this.weight = weight;
	}
	
	resetWeight() {
		this.setWeight(Infinity);
	}
	
	setAsTarget() {
		this.setWeight(0);
	}
	
	setPassability(passable) {
		this.passable = passable;
	}
}

function createCellMapWithSize(size) {
	let cellMap = [];

	for(let x = 0; x < size.width; x += 1) {
		cellMap[x] = [];

		for(let y = 0; y < size.height; y += 1) {
			cellMap[x][y] = new DijkstraCell({x: x, y: y});
		}
	}

	return cellMap;
}