import PubSub from './../core/PubSub';
import Log from './../module/Log';
import clone from 'lodash/clone';

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
		takeTurns(this.level.actors);
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

async function takeTurns(actors) {
	for(let actor of clone(actors)) {
		await actor.takeTurn();
	}

	// TODO: Prevent maximum call stack overflow if there is no interrupting turn.
	takeTurns(actors);
}
