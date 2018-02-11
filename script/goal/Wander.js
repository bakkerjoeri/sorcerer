import Goal from 'module/Goal';
import MoveNorth from 'goal/MoveNorth';
import MoveEast from 'goal/MoveEast';
import MoveSouth from 'goal/MoveSouth';
import MoveWest from 'goal/MoveWest';

export default class Wander extends Goal {
	takeAction(actor) {
		// let direction = Math.round(Math.random() * 3);
		// let howManyTimes = Math.round(Math.random() * 2) + 1;

		let direction = 0;

		// for(let t = 0; t < howManyTimes; t++) {
			if (direction === 0) {
				console.log(`${actor.type} will make a clockwise square`);
				this.subGoals.unshift(new MoveEast(this));
				this.subGoals.unshift(new MoveSouth(this));
				this.subGoals.unshift(new MoveWest(this));
				this.subGoals.unshift(new MoveNorth(this));
			}

			// move right, left, left, right
			if (direction === 1) {
				console.log(`${actor.type} will wiggle horizontally`);
				this.subGoals.unshift(new MoveEast(this));
				this.subGoals.unshift(new MoveWest(this));
				this.subGoals.unshift(new MoveWest(this));
				this.subGoals.unshift(new MoveEast(this));
			}

			// make a square, counter clockwise
			if (direction === 2) {
				console.log(`${actor.type} will make a counter-clockwise square`);
				this.subGoals.unshift(new MoveNorth(this));
				this.subGoals.unshift(new MoveWest(this));
				this.subGoals.unshift(new MoveEast(this));
				this.subGoals.unshift(new MoveSouth(this));
			}

			// move up, down, down, up.
			if (direction === 3) {
				console.log(`${actor.type} will wiggle vertically`);
				this.subGoals.unshift(new MoveNorth(this));
				this.subGoals.unshift(new MoveSouth(this));
				this.subGoals.unshift(new MoveSouth(this));
				this.subGoals.unshift(new MoveNorth(this));
			}
		// }
	}

	isFinished() {
		return false;
	}
}
