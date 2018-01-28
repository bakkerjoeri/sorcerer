import Actor from './Actor';
import Ticker from './../module/Ticker';

export default class NonPlayer extends Actor {
	constructor(type, options) {
		super(type, options);
	}

	takeAction() {
		return new Promise((resolve) => {
			if (!this.dead) {
				let actionTaken = false;
				let decision = Math.round(Math.random() * 3);

				if (decision === 0) {
					actionTaken = this.moveUp();
				}

				if (decision === 1) {
					actionTaken = this.moveRight();
				}

				if (decision === 2) {
					actionTaken = this.moveDown();
				}

				if (decision === 3) {
					actionTaken = this.moveLeft();
				}

				if (!actionTaken) {
					Ticker.schedule(this.takeAction.bind(this), 100);
				}
			}

			resolve();
		});
	}
}
