import Cell from './Cell';

export default class CellMap extends Array {
	static createWithSize(size) {
		let cellMap = [];

		for (let x = 0; x < size.width; x += 1) {
			cellMap[x] = [];

			for (let y = 0; y < size.height; y += 1) {
				cellMap[x][y] = new Cell({x: x, y: y});
			}
		}

		return new this(cellMap);
	}

	constructor(cells) {
		super(...cells);
	}

	get cells() {
		return this.reduce((cells, row) => [...cells, ...row], []);
	}

	findCellAtPosition(position) {
		return this[position.x][position.y];
	}

	hasCellAtPosition(position) {
		return this[position.x] && this[position.x][position.y];
	}

	findNeighbours(position) {
		if (!this.hasCellAtPosition(position)) {
			throw new Error('No cell exists at position', position);
		}
					let neighbours = [];

		if (this.hasCellAtPosition({
			x: position.x,
			y: position.y - 1
		})) {
			let north = this.findCellAtPosition({
				x: position.x,
				y: position.y - 1
			});

			neighbours.push(north);
		}

		if (this.hasCellAtPosition({
			x: position.x + 1,
			y: position.y
		})) {
			let east = this.findCellAtPosition({
				x: position.x + 1,
				y: position.y
			});


			neighbours.push(east);
		}

		if (this.hasCellAtPosition({
			x: position.x,
			y: position.y + 1
		})) {
			let south = this.findCellAtPosition({
				x: position.x,
				y: position.y + 1
			});

			neighbours.push(south);
		}

		if (this.hasCellAtPosition({
			x: position.x - 1,
			y: position.y
		})) {
			let west = this.findCellAtPosition({
				x: position.x - 1,
				y: position.y
			});

			neighbours.push(west);
		}

		return neighbours;
	}

	draw() {
		let lines = [];

		this.cells.forEach((cell, index) => {
			lines[index] = `${(lines[index] || '')}${!cell.passable ? ' #' : cell.weight === Infinity ? ' .' : cell.weight.toString().length === 1 ? ` ${cell.weight}` : cell.weight} `;
		});

		let grid = '';

		lines.forEach((line) => {
			grid = `${grid}${line}\n`;
		});

		console.log(grid);
	}
}
