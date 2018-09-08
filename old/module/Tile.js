export default class Tile {
	constructor(position) {
		this.position = position;
		this.actors = [];
		this.structures = [];
	}

	addActor(actor) {
		this.actors.push(actor);
	}

	removeActor(actor) {
		let actorIndex = this.actors.indexOf(actor);

		if (actorIndex !== -1) {
			this.actors.splice(actorIndex, 1);
		}
	}

	addStructure(structure) {
		this.structures.push(structure);
	}

	removeStructure(structure) {
		let structureIndex = this.structures.findIndex(structure);

		if (structureIndex !== -1) {
			this.actors.splice(structureIndex, 1);
		}
	}

	getGameObjects() {
		return this.structures.concat(this.actors);
	}

	getActors() {
		return this.actors;
	}

	getSolidGameObjects(exclude = []) {
		let gameObjects = this.getGameObjects();

		return gameObjects.filter((gameObject) => {
			return gameObject.solid === true && !exclude.includes(gameObject);
		});
	}

	getSolidActors(exclude = []) {
		let actors = this.getActors();

		return actors.filter((actor) => {
			return actor.solid === true && !exclude.includes(actor);
		});
	}

	hasSolidGameObjects(exclude = []) {
		return this.getSolidGameObjects(exclude).length > 0;
	}

	hasSolidActors(exclude = []) {
		return this.getSolidActors(exclude).length > 0;
	}
}
