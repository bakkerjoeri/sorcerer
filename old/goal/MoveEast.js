import Goal from 'module/Goal.js';

export default class MoveEast extends Goal {
	constructor(originalGoal) {
		super(originalGoal);

		this.moved = false;
	}

	takeAction(actor) {
		if (actor.dead) {
			return false;
		}

		let newLevelPosition = {
			x: actor.positionInLevel.x + 1,
			y: actor.positionInLevel.y,
		};

		if (!actor.canMoveToPosition(newLevelPosition)) {
			return false;
		}

		actor.moveTo(newLevelPosition);
		this.moved = true;

		return true;
	}

	isFinished() {
		return this.moved;
	}
}
