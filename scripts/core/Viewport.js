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
		if (this.entityToFollow) {
			let newViewportPosition = {
				x: this.entityToFollow.roomPosition.x - (this.size.width / 2) + (this.entityToFollow.size.width / 2),
				y: this.entityToFollow.roomPosition.y - (this.size.height / 2) + (this.entityToFollow.size.height / 2),
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
				&& entity.hasOwnProperty('roomPosition')
				&& entity.roomPosition.hasOwnProperty('x')
				&& entity.roomPosition.hasOwnProperty('y')
			) {
				entity.sprite.draw(this.context, calculatePositionInViewportFromRoomPosition({
					x: entity.roomPosition.x + entity.origin.x,
					y: entity.roomPosition.y + entity.origin.y
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

function calculatePositionInViewportFromRoomPosition(roomPosition, viewport) {
	return {
		x: roomPosition.x - viewport.position.x,
		y: roomPosition.y - viewport.position.y
	}
}
