import Actor from './Actor';
import Brain from './../module/Brain';
import Wander from './../goal/Wander';

export default class NonPlayer extends Actor {
	constructor(type, options) {
		super(type, options);
		this.brain = new Brain(this);
		this.brain.goals.push(new Wander());
	}

	takeAction() {
		return new Promise((resolve) => {
			if (!this.dead) {
				this.brain.act();
			}

			resolve();
		});
	}
}
