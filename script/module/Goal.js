export default class Goal {
	constructor(originalGoal) {
		this.subGoals = [];
		this.originalGoal = originalGoal;
	}

	takeAction() {
		throw new Error('This method should be implemented.');
	}

	isFinished() {
		throw new Error('This method should be implemented.');
	}
}
