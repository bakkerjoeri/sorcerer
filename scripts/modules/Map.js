import Tile from './../modules/Tile';

export default class Map {
	constructor(size, room) {
		this.room = room;
		this.tiles = createTilesetWithSize(size)
		this.actors = new Set();
		this.structures = new Set();
	}

	addActor(actor, position) {
		this.actors.add(actor);
		this.findTileAtPosition(position).addActor(actor);
		actor.map = this;
		this.room.addEntity(actor);
	}

	addStructure(structure, position) {
		this.structures.add(structure);
		this.findTileAtPosition(position).addStructure(structure);
		structure.map = this;
		this.room.addEntity(structure);
	}

	findTileAtPosition(position) {
		return this.tiles[position.x][position.y];
	}

	hasTileAtPosition(position) {
		return Boolean(
			this.tiles[position.x]
			&& this.tiles[position.x][position.y]
		);
	}
}

function createTilesetWithSize(size) {
	let tiles = [];

	for(let x = 0; x < size.width; x += 1) {
		tiles[x] = [];

		for(let y = 0; y < size.height; y += 1) {
			tiles[x][y] = new Tile({x: x, y: y});
		}
	}

	return tiles;
}
