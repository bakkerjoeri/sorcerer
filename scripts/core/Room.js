export default class Room {
	constructor(size) {
		this.setSize(size);

		this.entities = [];
	}

	addEntity(entity) {
		this.entities.push(entity);
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
}
