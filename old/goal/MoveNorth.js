import Goal from 'module/Goal.js';

export default class MoveNorth extends Goal {
	constructor(originalGoal) {
		super(originalGoal);

		this.moved = false;
	}

	takeAction(actor) {
		if (actor.dead) {
			return false;
		}

		let newLevelPosition = {
			x: actor.positionInLevel.x,
			y: actor.positionInLevel.y - 1,
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
