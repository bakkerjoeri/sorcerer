export default class Room {
	constructor(options) {
		this.setOrigin(options.origin);
		this.setSize(options.size);
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

	setSize(size) {
		this.size = size;
	}

	getSize() {
		return this.size;
	}

	setBackgroundColor(backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	getBackgroundColor() {
		return this.backgroundColor;
	}
}
