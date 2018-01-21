import Actor from './Actor';

export default class NonPlayer extends Actor {
	constructor(type, options) {
		super(type, options);
	}

	takeAction() {
		return new Promise((resolve) => {
			if (!this.dead) {
				let decision = Math.round(Math.random() * 3);

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

			resolve();
		});
	}
}
