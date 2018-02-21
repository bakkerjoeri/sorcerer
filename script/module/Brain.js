export default class Brain {
	constructor(owner) {
		this.owner = owner;
		this.goals = [];
	}

	act() {
		console.log('-------------------');
		console.log('New brain act!');
		this.processGoal(this.goals[0]);
	}

	processGoal(goal) {
		// If the goal is finished, it removes itself from its parent’s subgoals and traversal resumes from the parent.
		console.log(' ');
		console.log(`We're processing goal ${goal.constructor.name}`, goal);

		console.log('Is it finished?', goal.isFinished());
		if (goal.isFinished()) {
			console.log('It is!');
			if (goal.originalGoal) {
				console.log(`Removing goal ${goal.constructor.name} from parent subgoals...`);
				goal.originalGoal.subGoals.splice(goal.originalGoal.subGoals.indexOf(goal), 1);

				console.log(`... and resuming from parent goal ${goal.originalGoal.constructor.name}.`);
				this.processGoal(goal.originalGoal);
			}

			return;
		}

		// If the goal has no subgoals, we execute the goal’s action.
		if (goal.subGoals.length === 0) {
			console.log(`${goal.constructor.name} has no subgoals, so let's take action!`);
			goal.takeAction(this.owner)
				// If the goal fails to execute, all its parent’s subgoals are removed and traversal is resumed from that parent goal.
				.catch(() => {
					console.log(`Failed to execute ${goal.constructor.name}!`);
					console.log(`Removing all subgoals from parent goal ${goal.originalGoal.constructor.name}...`);
					goal.originalGoal.subGoals.length = 0;

					console.log(`... and resuming from parent goal ${goal.originalGoal.constructor.name}.`);
					return this.processGoal(goal.originalGoal);
				});
		}

		// If now there are subgoals, traversal continues.
		if (goal.subGoals.length > 0) {
			console.log(`${goal.constructor.name}'s current subgoals: `, goal.subGoals.slice(0));
			console.log(`Traversing into goal ${goal.subGoals[0].constructor.name}`);
			return this.processGoal(goal.subGoals[0]);
		}

		// If now there are no subgoals, traversal ends and the turn is over.
		console.log(`Done processing goal ${goal.constructor.name}.`);
		return;
	}

	processFinishedGoal(goal) {
		goal.originalGoal.subGoals.splice(goal.originalGoal.subGoals.indexOf(goal), 1);
	}

	processFailedGoal(goal) {
		goal.originalGoal.subGoals.length = 0;
	}
}
