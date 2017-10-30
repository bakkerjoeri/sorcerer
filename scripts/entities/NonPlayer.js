import Actor from './Actor';

export default class NonPlayer extends Actor {
	constructor(type, options) {
		super(type, options);
	}

	takeTurn() {
		if (!this.dead) {
			let decision = Math.round(Math.random() * 8);

			if (decision === 0) {
				this.moveUp();
			}

			if (decision === 1) {
				this.moveRight();
			}

			if (decision === 2) {
				this.moveDown();
			}

			if (decision === 3) {
				this.moveLeft();
			}
		}
	}
}
