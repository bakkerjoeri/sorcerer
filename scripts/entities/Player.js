import Actor from './Actor';
import PubSub from './../core/PubSub';
import Log from './../modules/Log';

export default class Player extends Actor {
	constructor(type, options) {
		super(type, options);
		Log.showMessage(`<em>${this.type}</em> awakens...`);
	}

	takeTurn() {
		return new Promise((resolve) => {
			if (!this.dead) {
				this.keyDownEvent = this.addEventListener('keydown', (event) => {
					this.handleKeyPressed(event, resolve);
				});
			} else {
				window.setTimeout(resolve, 1000);
			}
		});
	}

	handleKeyPressed(event, callback) {
		let actionTaken = false;

		if (event.key === ' ' || event.key === '5') {
			event.preventDefault();
			Log.showMessage(`${this.type} waits...`);
			actionTaken = true;
		}

		if (event.key === 'ArrowUp' || event.key === '8') {
			event.preventDefault();
			actionTaken = this.moveUp();
		}

		if (event.key === 'ArrowRight' || event.key === '6') {
			event.preventDefault();
			actionTaken = this.moveRight();
		}

		if (event.key === 'ArrowDown' || event.key === '2') {
			event.preventDefault();
			actionTaken = this.moveDown();
		}

		if (event.key === 'ArrowLeft' || event.key === '4') {
			event.preventDefault();
			actionTaken = this.moveLeft();
		}

		if (actionTaken) {
			this.removeEventListener(this.keyDownEvent);
			callback();
		}
	}
}
