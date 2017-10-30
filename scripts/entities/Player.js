import Actor from './Actor';
import PubSub from './../core/PubSub';

export default class Player extends Actor {
	constructor(type, options) {
		super(type, options);

		window.addEventListener('keydown', this.onKeyDown.bind(this));
	}

	onKeyDown(event) {
		if (!this.dead) {
			let actionTaken = false;

			if (event.key === 'ArrowUp') {
				event.preventDefault();
				actionTaken = this.moveUp();
			}

			if (event.key === 'ArrowRight') {
				event.preventDefault();
				actionTaken = this.moveRight();
			}

			if (event.key === 'ArrowDown') {
				event.preventDefault();
				actionTaken = this.moveDown();
			}

			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				actionTaken = this.moveLeft();
			}

			if (actionTaken) {
				PubSub.publish('playerTurnTaken');
			}
		}
	}
}
