import Goal from 'module/Goal';
import MoveToPosition from 'goal/MoveToPosition';

export default class Wander extends Goal {
	takeAction(actor) {
		return new Promise((succeed) => {
			if (!actor.canMove()) {
				actor.wait();
				return succeed();
			}
			
			this.subGoals.push(new MoveToPosition({
				x: Math.floor(Math.random() * actor.level.size.width),
				y: Math.floor(Math.random() * actor.level.size.height),
			}, this));
			
			return succeed();
		});
	}

	isFinished() {
		return false;
	}
}
