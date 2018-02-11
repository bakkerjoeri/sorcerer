import Goal from 'module/Goal';
import Ticker from 'module/Ticker';

export default class MoveEast extends Goal {
	constructor(originalIntent) {
		super(originalIntent);

		this.moved = false;
	}

	takeAction(actor) {
		if (actor.dead) {
			return this.fail();
		}

		let newLevelPosition = {
			x: actor.positionInLevel.x + 1,
			y: actor.positionInLevel.y,
		};

		if (!actor.canMoveToPosition(newLevelPosition)) {
			Ticker.schedule(actor.takeAction.bind(actor), actor.stats.moveCost);
			return this.fail();
		}

		actor.moveTo(newLevelPosition);
		this.moved = true;
	}

	isFinished() {
		return this.moved;
	}
}
