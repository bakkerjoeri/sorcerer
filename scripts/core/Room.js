export default class Room {
	constructor(size) {
		this.setSize(size);

		this.entities = [];
	}

	step(time) {
		// update the viewport
		this.viewport.step(time);

		// update each entity
		this.entities.forEach((entity) => {
			entity.step(time);
		});
	}

	draw(time) {
		// clear the current viewport
		this.viewport.clearDrawing(this.context);

		// draw room background
		this.drawBackground(this.context, {
			x: -this.viewport.position.x,
			y: -this.viewport.position.y,
		});

		// draw all visible sprites
		this.entities.filter((entity) => {
			return entity.visible;
		}).forEach((visibleEntity) => {
			visibleEntity.draw(time, this.canvas, this.viewport);
		});
	}

	useViewport(viewport) {
		this.viewport = viewport;
		viewport.setRoom(this);

		if (this.canvas) {
			fitCanvasToViewport(this.canvas, viewport);
		}
	}

	useCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		if (this.viewport) {
			fitCanvasToViewport(canvas, this.viewport);
		}
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

function fitCanvasToViewport(canvas, viewport) {
	canvas.width = viewport.size.width;
	canvas.height = viewport.size.height;
}
