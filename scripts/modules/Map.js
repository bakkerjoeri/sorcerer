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

		this.forEachTileInBoundaries(position, actor.size, (tile) => {
			tile.addActor(actor);
		});

		actor.updateMapPosition(position);
		this.room.addEntity(actor);
	}

	addStructure(structure, position) {
		structure.map = this;
		this.structures.add(structure);

		this.forEachTileInBoundaries(position, structure.size, (tile) => {
			tile.addStructure(structure);
		});

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

	forEachTileInBoundaries(position, size, callback) {
		for (let x = position.x; x < position.x + size.width; x = x + 1) {
			for (let y = position.y; y < position.y + size.height; y = y + 1) {
				let tilePosition = {x: x, y: y};

				if (this.hasTileAtPosition(tilePosition)) {
					callback(this.findTileAtPosition(tilePosition));
				}
			}
		}
	}

	hasTileAtPosition(position) {
		return Boolean(
			this.tiles[position.x]
			&& this.tiles[position.x][position.y]
		);
	}

	moveActorFromPositionToPosition(actor, oldPosition, newPosition) {
		this.forEachTileInBoundaries(oldPosition, actor.size, (tile) => {
			tile.removeActor(actor);
		});

		this.forEachTileInBoundaries(newPosition, actor.size, (tile) => {
			tile.addActor(actor);
		});
	}

	getSolidEntitiesInBoundaries(position, size, exclude = []) {
		let solidEntities = [];

		this.forEachTileInBoundaries(position, size, (tile) => {
			solidEntities = solidEntities.concat(tile.getSolidEntities(exclude));
		});

		return solidEntities;
	}

	hasSolidEntitiesInBoundaries(position, size, exclude = []) {
		return this.getSolidEntitiesInBoundaries(position, size, exclude).length > 0;
	}

	getSolidActorsInBoundaries(position, size, exclude = []) {
		let solidActors = [];

		this.forEachTileInBoundaries(position, size, (tile) => {
			solidActors = solidActors.concat(tile.getSolidActors(exclude));
		});

		return solidActors;
	}

	hasSolidActorsInBoundaries(position, size, exclude = []) {
		return this.getSolidActorsInBoundaries(position, size, exclude).length > 0;
	}

	areBoundariesWithinMapBoundaries(position, size) {
		return position.x >= 0
			&& position.y >= 0
			&& position.x + size.width <= this.size.width
			&& position.y + size.height <=  this.size.height;
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
