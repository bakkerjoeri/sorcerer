export default class Room {
	constructor(size) {
		this.setSize(size);

		this.entities = new Set();
	}

	addEntity(entity) {
		this.entities.add(entity);
		entity.room = this;
	}

	getEntities() {
		return this.entities;
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

	drawBackground(context) {
		context.fillStyle = this.backgroundColor;
		context.fillRect(
			0,
			0,
			this.size.width,
			this.size.height
		);
	}

	hasSolidEntityInBoundaries(boundaries) {
		return this.findSolidEntitiesInBoundaries(boundaries).length > 0;
	}

	findSolidEntitiesInBoundaries(boundaries) {
		let entities = [];

		this.entities.forEach((entity) => {
			if (entity.solid && entity.isWithinBoundaries(boundaries)) {
				entities.push(entity);
			}
		});

		return entities;
	}
}
