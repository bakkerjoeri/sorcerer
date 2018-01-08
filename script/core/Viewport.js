export default class Viewport {
	constructor(size, options = {}) {
		this.setSize(size);

		if (options.position) {
			this.position = options.position;
		} else {
			this.position = {
				x: 0,
				y: 0,
			};
		}

		if (options.canvasPosition) {
			this.canvasPosition = options.canvasPosition;
		} else {
			this.canvasPosition = {
				x: 0,
				y: 0,
			};
		}

		if (options.active === false) {
			this.deactivate();
		} else {
			this.activate();
		}
	}

	activate() {
		this.active = true;
	}

	deactivate() {
		this.active = false;
	}

	isActive() {
		return this.active;
	}

	setRoom(room) {
		this.room = room;
	}

	followEntity(entity) {
		this.entityToFollow = entity;
	}

	setSize(size) {
		this.size = size;
	}

	step(time) {
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

			// TODO: Remove dependency on `room`.
			if (newViewportPosition.x > (this.room.size.width - this.size.width)) {
				newViewportPosition.x = this.room.size.width - this.size.width;
			}

			if (newViewportPosition.y > (this.room.size.height - this.size.height)) {
				newViewportPosition.y = this.room.size.height - this.size.height;
			}

			this.position = newViewportPosition;
		}
	}

	draw(time, room, canvas) {
		let context = canvas.getContext('2d');

		// Clear viewport
		this.clearDrawing(canvas.getContext('2d'));

		// draw room background
		room.drawBackground(context, {
			x: -this.position.x,
			y: -this.position.y,
		}, {
			width: this.width,
			height: this.height,
		});

		this.drawMiddle(context);

		// draw all entities
		this.room.entities.filter((entity) => {
			return entity.visible
		}).forEach((visibleEntity) => {
			visibleEntity.draw(time, canvas, this);
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
