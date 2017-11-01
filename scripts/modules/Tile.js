export default class Tile {
	constructor(position) {
		this.position = position;
		this.actors = new Set();
		this.structures = new Set();
	}

	addActor(actor) {
		this.actors.add(actor);
		actor.updateMapPosition(this.position);
	}

	removeActor(actor) {
		this.actors.remove(actor);
	}

	addStructure(structure) {
		this.structures.add(structure);
		structure.updateMapPosition(this.position);
	}

	removeStructure(structure) {
		this.structures.remove(structure);
	}
}
