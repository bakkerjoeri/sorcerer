export default class Brain {
	constructor(owner) {
		this.owner = owner;
		this.goals = [];
	}

	act() {
		this.processGoal(this.goals[0]);
	}

	processGoal(goal) {
		// If the goal is finished, it removes itself from its parent’s subgoals and traversal resumes from the parent.
		if (goal.isFinished(this.owner)) {
			if (goal.originalGoal) {
				goal.originalGoal.subGoals.splice(goal.originalGoal.subGoals.indexOf(goal), 1);

				this.processGoal(goal.originalGoal);
			}

			return;
		}

		// If the goal has no subgoals, we execute the goal’s action.
		if (goal.subGoals.length === 0) {
			goal.takeAction(this.owner)
				// If the goal fails to execute, all its parent’s subgoals are removed and traversal is resumed from that parent goal.
				.catch(() => {
					goal.originalGoal.subGoals.length = 0;

					return this.processGoal(goal.originalGoal);
				});
		}

		// If now there are subgoals, traversal continues.
		if (goal.subGoals.length > 0) {
			return this.processGoal(goal.subGoals[0]);
		}

		// If now there are no subgoals, traversal ends and the turn is over.
		return;
	}

	processFinishedGoal(goal) {
		goal.originalGoal.subGoals.splice(goal.originalGoal.subGoals.indexOf(goal), 1);
	}

	processFailedGoal(goal) {
		goal.originalGoal.subGoals.length = 0;
	}
}
