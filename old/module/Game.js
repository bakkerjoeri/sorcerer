import Ticker from './Ticker.js';

export default class Game {
	constructor(options = {}) {
		this.room = options.room;
		this.level = options.level;
	}

	start() {
		if (!this.level) {
			throw new Error('Cannot start without a level.');
		}

		window.requestAnimationFrame(this.step.bind(this));
		Ticker.startTicking(this.level.actors);
	}

	step(time) {
		if (!this.room) {
			throw new Error('Cannot start updating without a room.');
		}

		this.room.step(time);
		this.room.draw(time);

		window.requestAnimationFrame(this.step.bind(this));
	}
}
