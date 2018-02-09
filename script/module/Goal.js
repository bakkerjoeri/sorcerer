export default class Goal {
	constructor(originalIntent) {
		this.subGoals = [];
		this.originalIntent = originalIntent;
	}

	act(actor) {
		while (this.subGoals.length > 0 && this.subGoals[this.subGoals.length - 1].isFinished(actor)) {
			this.subGoals.pop();
		}

		if (this.subGoals.length === 0) {
			this.takeAction(actor);
		}

		if (this.subGoals.length > 0) {
			this.subGoals[this.subGoals.length - 1].act(actor);
		}
	}

	takeAction() {
		throw new Error('This method should be implemented.');
	}

	isFinished() {
		throw new Error('This method should be implemented.');
	}

	fail() {
		if (this.originalIntent) {
			this.originalIntent.resume();
		}
	}

	resume() {
		this.subGoals.length = 0;
	}
}
