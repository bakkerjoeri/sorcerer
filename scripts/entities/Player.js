import Actor from './Actor';
import PubSub from './../core/PubSub';

export default class Player extends Actor {
	constructor(type, options) {
		super(type, options);

		window.addEventListener('keydown', this.onKeyDown.bind(this));
	}

	onKeyDown(event) {
		let moved = false;
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			moved = this.moveUp();
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			moved = this.moveRight();
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			moved = this.moveDown();
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			moved = this.moveLeft();
		}

		if (moved) {
			PubSub.publish('playerTurnTaken');
		}
	}
}
