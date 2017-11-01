export default class Room {
	constructor(size) {
		this.setSize(size);

		this.entities = new Set();
	}

	addEntity(entity) {
		this.entities.add(entity);
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

	drawBackground(context, offset) {
		context.fillStyle = this.backgroundColor;
		context.fillRect(
			offset.x,
			offset.y,
			this.size.width,
			this.size.height,
		);

		context.strokeStyle = '#bad455';
		context.strokeRect(
			offset.x,
			offset.y,
			this.size.width,
			this.size.height,
		);
	}

	hasSolidEntityInBoundaries(boundaries) {
		return this.findSolidEntitiesInBoundaries(boundaries).length > 0;
	}

	findSolidEntitiesInBoundaries(boundaries, exclude = []) {
		let entities = [];

		this.entities.forEach((entity) => {
			if (entity.solid && entity.isWithinBoundaries(boundaries) && !exclude.includes(entity)) {
				entities.push(entity);
			}
		});

		return entities;
	}
}
