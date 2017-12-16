export default class Viewport {
	constructor(canvas, position, size) {
		this.useCanvas(canvas);
		this.position = position;
		this.setSize(size);

		this.startUpdating();
	}

	showRoom(room) {
		this.room = room;
	}

	useCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		if (this.size) {
			changeCanvasToSize(canvas, this.size);
		}
	}

	followEntity(entity) {
		this.entityToFollow = entity;
	}

	setSize(size) {
		this.size = size;

		if (this.canvas) {
			changeCanvasToSize(this.canvas, size);
		}
	}

	startUpdating() {
		window.requestAnimationFrame(this.update.bind(this));
	}

	update(time) {
		// update position to follow entity
		if (this.entityToFollow && this.entityToFollow.sprite) {
			let newViewportPosition = {
				x: this.entityToFollow.position.x - (this.size.width / 2) + (this.entityToFollow.sprite.size.width / 2),
				y: this.entityToFollow.position.y - (this.size.height / 2) + (this.entityToFollow.sprite.size.height / 2),
			};

			if (newViewportPosition.x < 0) {
				newViewportPosition.x = 0;
			}

			if (newViewportPosition.y < 0) {
				newViewportPosition.y = 0;
			}

			if (newViewportPosition.x > (this.room.size.width - this.size.width)) {
				newViewportPosition.x = this.room.size.width - this.size.width;
			}

			if (newViewportPosition.y > (this.room.size.height - this.size.height)) {
				newViewportPosition.y = this.room.size.height - this.size.height;
			}

			this.position = newViewportPosition;
		}

		this.step(time);
		this.draw(time);

		window.requestAnimationFrame(this.update.bind(this));
	}

	step(time) {
		this.room.entities.forEach((entity) => {
			entity.step(time);

			if (entity.sprite) {
				entity.sprite.step(time);
			}
		});
	}

	draw(time) {
		// remove viewport drawings
		this.clearDrawing(this.context);

		// draw room
		this.room.drawBackground(this.context, {
			x: -this.position.x,
			y: -this.position.y,
		});

		this.room.entities.forEach((entity) => {
			if (
				entity.hasOwnProperty('sprite')
				&& entity.hasOwnProperty('position')
				&& entity.position.hasOwnProperty('x')
				&& entity.position.hasOwnProperty('y')
			) {
				entity.sprite.draw(this.context, calculatePositionInViewportFromPosition({
					x: entity.position.x + entity.sprite.origin.x,
					y: entity.position.y + entity.sprite.origin.y
				}, this));
			}
		});
	}

	drawMiddle(context) {
		context.strokeStyle = '#bad455';

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(this.size.width, this.size.height);
		context.stroke();

		context.beginPath();
		context.moveTo(this.size.width, 0);
		context.lineTo(0, this.size.height);
		context.stroke();
	}

	clearDrawing(context) {
		context.clearRect(
			0,
			0,
			this.size.width,
			this.size.height
		);
	}
}

function changeCanvasToSize(canvas, size) {
	canvas.width = size.width;
	canvas.height = size.height;
}

function calculatePositionInViewportFromPosition(position, viewport) {
	return {
		x: position.x - viewport.position.x,
		y: position.y - viewport.position.y
	}
}
