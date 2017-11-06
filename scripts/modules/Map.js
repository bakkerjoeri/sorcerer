import Tile from './../modules/Tile';

export default class Map {
	constructor(size, room) {
		this.size = size;
		this.room = room;
		this.tiles = createTilesetWithSize(size)
		this.actors = new Set();
		this.structures = new Set();
	}

	addActor(actor, position) {
		actor.map = this;
		this.actors.add(actor);
		this.findTileAtPosition(position).addActor(actor);

		actor.updateMapPosition(position);
		this.room.addEntity(actor);
	}

	addStructure(structure, position) {
		structure.map = this;
		this.structures.add(structure);
		this.findTileAtPosition(position).addStructure(structure);

		structure.updateMapPosition(position);
		this.room.addEntity(structure);
	}

	findTileAtPosition(position) {
		return this.tiles[position.x][position.y];
	}

	forEachTile(callback) {
		this.tiles.forEach((tileRow) => {
			tileRow.forEach(callback);
		});
	}

	hasTileAtPosition(position) {
		return Boolean(
			this.tiles[position.x]
			&& this.tiles[position.x][position.y]
		);
	}

	moveActorFromPositionToPosition(actor, oldPosition, newPosition) {
		if (this.hasTileAtPosition(oldPosition)) {
			this.findTileAtPosition(oldPosition).removeActor(actor);
		}

		if (this.hasTileAtPosition(newPosition)) {
			this.findTileAtPosition(newPosition).addActor(actor);
		}
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
