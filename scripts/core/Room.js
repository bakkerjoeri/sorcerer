export default class Room {
	constructor(options) {
		this.setOrigin(options.origin);
		this.setBoundaries(options.boundaries);
		this.setBackgroundColor(options.backgroundColor);

		this.entities = new Set();
	}

	addEntity(entity) {
		this.entities.add(entity);
	}

	getEntities() {
		return this.entities;
	}

	setOrigin(origin) {
		this.origin = origin;
	}

	getOrigin() {
		return this.origin;
	}

	setBoundaries(boundaries) {
		this.boundaries = boundaries;
	}

	getBoundaries() {
		return this.boundaries;
	}

	setBackgroundColor(backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	getBackgroundColor() {
		return this.backgroundColor;
	}
}
