import PubSub from 'core/PubSub';
import Log from 'module/Log';

export default class Game {
	constructor(options = {}) {
		this.room = options.room;
		this.level = options.level;
	}

	start() {
		if (!this.level) {
			throw new Error('Cannot start without a level.');
		}

		window.requestAnimationFrame(this.loop.bind(this));
		tick(this.level.actors);
	}

	loop(time) {
		if (!this.room) {
			throw new Error('Cannot start updating without a room.');
		}

		this.room.step(time);
		this.room.draw(time);

		window.requestAnimationFrame(this.loop.bind(this));
	}
}

async function tick(actors) {
	for(let actor of actors.slice(0)) {
		await actor.tick();
	}

	// TODO: Prevent maximum call stack overflow if there is no interrupting turn.
	tick(actors);
}
