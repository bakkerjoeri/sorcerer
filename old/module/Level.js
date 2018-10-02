import Tile from './../module/Tile.js';

export default class Level {
	constructor(size, room) {
		this.size = size;
		this.room = room;
		this.tiles = createTilesetWithSize(size)
		this.actors = [];
		this.structures = [];
	}

	addActor(actor, position) {
		actor.level = this;
		this.actors.push(actor);

		this.forEachTileInBoundaries(position, actor.sizeInLevel, (tile) => {
			tile.addActor(actor);
		});

		actor.setPositionInLevel(position);
		this.room.addGameObject(actor);
	}

	addStructure(structure, position) {
		structure.level = this;
		this.structures.push(structure);

		this.forEachTileInBoundaries(position, structure.sizeInLevel, (tile) => {
			tile.addStructure(structure);
		});

		structure.setPositionInLevel(position);
		this.room.addGameObject(structure);
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
		this.forEachTileInBoundaries(oldPosition, actor.sizeInLevel, (tile) => {
			tile.removeActor(actor);
		});

		this.forEachTileInBoundaries(newPosition, actor.sizeInLevel, (tile) => {
			tile.addActor(actor);
		});

		actor.setPositionInLevel(newPosition);
	}

	getSolidGameObjectsInBoundaries(position, size, exclude = []) {
		let solidGameObjects = [];

		this.forEachTileInBoundaries(position, size, (tile) => {
			solidGameObjects = solidGameObjects.concat(tile.getSolidGameObjects(exclude));
		});

		return solidGameObjects;
	}

	hasSolidGameObjectsInBoundaries(position, size, exclude = []) {
		return this.getSolidGameObjectsInBoundaries(position, size, exclude).length > 0;
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

	areBoundariesWithinLevelBoundaries(position, size) {
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
