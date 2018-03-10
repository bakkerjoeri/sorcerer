import Actor from './Actor';
import Ticker from './../module/Ticker';
import Log from './../module/Log';

let turnCount = 0;

export default class Player extends Actor {
	constructor(type, options) {
		super(type, options);
		Log.showMessage(`<em>${this.type}</em> awakens...`);
		this.turnCount = 0;
	}

	takeAction() {
		return new Promise((resolve) => {
			turnCount += 1;
			Log.showMessage(`turn ${turnCount}`);
			
			if (!this.dead) {
				this.keyDownEvent = this.addEventListener('keydown', (event) => {
					this.handleKeyPressed(event, resolve);
				});
			} else {
				Ticker.schedule(this.takeAction.bind(this), this.stats.moveCost, this);
				window.setTimeout(resolve, 1000);
			}
		});
	}

	handleKeyPressed(event, callback) {
		let actionTaken = false;

		if (event.key === ' ' || event.key === '5') {
			event.preventDefault();
			Log.showMessage(`<em>${this.type}</em> waits...`);
			this.wait();
			actionTaken = true;
		}

		if (event.key === 'ArrowUp' || event.key === '8') {
			event.preventDefault();
			actionTaken = this.actNorth();
		}

		if (event.key === 'ArrowRight' || event.key === '6') {
			event.preventDefault();
			actionTaken = this.actEast();
		}

		if (event.key === 'ArrowDown' || event.key === '2') {
			event.preventDefault();
			actionTaken = this.actSouth();
		}

		if (event.key === 'ArrowLeft' || event.key === '4') {
			event.preventDefault();
			actionTaken = this.actWest();
		}

		if (actionTaken) {
			this.removeEventListener(this.keyDownEvent);
			callback();
		}
	}

	actTowardPosition(position) {
		if (this.canMoveToPosition(position)) {
			return this.moveTo(position);
		}

		if (this.canAttackPosition(position)) {
			return this.attackPosition(position);
		}

		return false;
	}

	actNorth() {
		let newPosition = {
			x: this.positionInLevel.x,
			y: this.positionInLevel.y - 1,
		};

		return this.actTowardPosition(newPosition);
	}

	actEast() {
		let newPosition = {
			x: this.positionInLevel.x + 1,
			y: this.positionInLevel.y,
		};

		return this.actTowardPosition(newPosition);
	}

	actSouth() {
		let newPosition = {
			x: this.positionInLevel.x,
			y: this.positionInLevel.y + 1,
		};

		return this.actTowardPosition(newPosition);
	}

	actWest() {
		let newPosition = {
			x: this.positionInLevel.x - 1,
			y: this.positionInLevel.y,
		};

		return this.actTowardPosition(newPosition);
	}
}
