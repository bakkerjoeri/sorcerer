import Goal from 'module/Goal';

export default class MoveSouth extends Goal {
	constructor(originalGoal) {
		super(originalGoal);

		this.moved = false;
	}

	takeAction(actor) {
		return new Promise((success, fail) => {
			if (actor.dead) {
				return fail();
			}

			let newLevelPosition = {
				x: actor.positionInLevel.x,
				y: actor.positionInLevel.y + 1,
			};

			if (!actor.canMoveToPosition(newLevelPosition)) {
				return fail();
			}

			actor.moveTo(newLevelPosition);
			this.moved = true;

			return success();
		});
	}

	isFinished() {
		return this.moved;
	}
}
