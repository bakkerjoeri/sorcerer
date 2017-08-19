export default class Game {
	constructor(canvas, width, height) {
		canvas.width = width;
		canvas.height = height;
		this.context = canvas.getContext('2d');

		this.rooms = new Set();
		this.startStepping();
	}

	addRoom(room) {
		this.rooms.add(room);
	}

	startStepping() {
		window.requestAnimationFrame(this.step.bind(this));
	}

	step(time) {
		this.rooms.forEach((room) => {
			// destroy room
			this.context.clearRect(room.origin.x, room.origin.y, room.boundaries.width, room.boundaries.height);

			// draw background
			this.context.fillStyle = room.backgroundColor;
			this.context.fillRect(room.origin.x, room.origin.y, room.boundaries.width, room.boundaries.height);

			// draw all entities
			room.entities.forEach((entity) => {
				entity.sprite.draw(this.context, entity.position.x, entity.position.y);
			});
		});

		window.requestAnimationFrame(this.step.bind(this));
	}
}
