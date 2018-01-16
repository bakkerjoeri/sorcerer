const DEFAULT_OPTIONS = {
	position: {
		x: 0,
		y: 0,
	},
	origin: {
		x: 0,
		y: 0,
	},
	active: true,
};

export default class Viewport {
	constructor(size, options = {}) {
		this.setSize(size);

		options = Object.assign({}, DEFAULT_OPTIONS, options);
		this.position = options.position;
		this.origin = options.origin;

		if (options.active) {
			this.activate();
		} else {
			this.deactivate();
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

	step() {
		// update position to follow entity
		if (this.entityToFollow && this.entityToFollow.sprite && this.entityToFollow.sprite.size) {
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

	draw(time, canvas) {
		let context = canvas.getContext('2d');

		// Clear viewport
		this.clearDrawing(canvas.getContext('2d'));

		// draw room background
		this.room.drawBackground(context, {
			x: this.origin.x,
			y: this.origin.y,
		}, {
			width: this.size.width,
			height: this.size.height,
		});

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
		context.moveTo(this.origin.x, this.origin.y);
		context.lineTo(this.origin.x + this.size.width, this.origin.y + this.size.height);
		context.stroke();

		context.beginPath();
		context.moveTo(this.origin.x + this.size.width, this.origin.y);
		context.lineTo(this.origin.x, this.origin.y + this.size.height);
		context.stroke();
	}

	clearDrawing(context) {
		context.clearRect(
			this.origin.x,
			this.origin.y,
			this.size.width,
			this.size.height
		);
	}
}
