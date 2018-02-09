import Goal from 'module/Goal';
import Ticker from 'module/Ticker';

export default class MoveEast extends Goal {
	constructor(originalIntent) {
		super(originalIntent);

		this.moved = false;
	}

	takeAction(actor) {
		if (!actor.dead && actor.moveRight()) {
			this.moved = true;
		} else {
			Ticker.schedule(actor.takeAction.bind(actor), 100);
			this.fail();
		}
	}

	isFinished() {
		return this.moved;
	}
}
