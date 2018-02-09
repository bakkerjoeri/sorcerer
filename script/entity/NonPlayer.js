import Actor from './Actor';
import Wander from 'goal/Wander';

export default class NonPlayer extends Actor {
	constructor(type, options) {
		super(type, options);
		this.goal = new Wander();
	}

	takeAction() {
		return new Promise((resolve) => {
			this.goal.act(this);

			resolve();
		});
	}
}
