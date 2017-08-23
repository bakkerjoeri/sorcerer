export default class Game {
	constructor(canvas, width, height) {
		canvas.width = width;
		canvas.height = height;
		this.context = canvas.getContext('2d');

		this.startStepping();
	}

	setRoom(room) {
		this.room = room;
	}

	getRoom() {
		return this.room;
	}

	startStepping() {
		window.requestAnimationFrame(this.step.bind(this));
	}

	step(time) {
		if (this.room) {
			// remove room drawings
			this.context.clearRect(this.room.origin.x, this.room.origin.y, this.room.size.width, this.room.size.height);

			// draw background
			this.context.fillStyle = this.room.backgroundColor;
			this.context.fillRect(this.room.origin.x, this.room.origin.y, this.room.size.width, this.room.size.height);

			// step and draw entities
			this.room.entities.forEach((entity) => {
				entity.step(time);
				entity.sprite.step(time);

				entity.sprite.draw(this.context, entity.position.x, entity.position.y);
			});
		}

		window.requestAnimationFrame(this.step.bind(this));
	}
}
