export default class Room {
	constructor(size) {
		this.setSize(size);

		this.viewports = [];
		this.entities = [];
	}

	step(time) {
		// update the viewports
		this.viewports.filter((viewport) => {
			return viewport.isActive();
		}).forEach((activeViewport) => {
			activeViewport.step(time);;
		});

		// update each entity
		this.entities.forEach((entity) => {
			entity.step(time);
		});
	}

	draw(time) {
		// draw each viewport
		this.viewports.filter((viewport) => {
			return viewport.isActive();
		}).forEach((activeViewport) => {
			activeViewport.draw(time, this.canvas);
		});
	}

	addViewport(viewport) {
		this.viewports.push(viewport);
		viewport.setRoom(this);
	}

	useCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
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

	drawBackground(context, offset, size) {
		context.fillStyle = this.backgroundColor;
		context.fillRect(
			offset.x,
			offset.y,
			size.width,
			size.height,
		);

		context.strokeStyle = '#bad455';
		context.strokeRect(
			offset.x,
			offset.y,
			size.width,
			size.height,
		);
	}
}
