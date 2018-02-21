import Goal from 'module/Goal';
import MoveNorth from 'goal/MoveNorth';
import MoveEast from 'goal/MoveEast';
import MoveSouth from 'goal/MoveSouth';
import MoveWest from 'goal/MoveWest';

export default class Wander extends Goal {
	takeAction(actor) {
		return new Promise((success) => {
			let direction = Math.round(Math.random() * 3);
			// let howManyTimes = Math.round(Math.random() * 2) + 1;

			// for(let t = 0; t < howManyTimes; t++) {
				if (direction === 0) {
					console.log(`${actor.type} will make a clockwise square`);
					this.subGoals.push(new MoveNorth(this));
					this.subGoals.push(new MoveEast(this));
					this.subGoals.push(new MoveSouth(this));
					this.subGoals.push(new MoveWest(this));
				}

				// move right, left, left, right
				if (direction === 1) {
					console.log(`${actor.type} will wiggle horizontally`);
					this.subGoals.push(new MoveEast(this));
					this.subGoals.push(new MoveWest(this));
					this.subGoals.push(new MoveWest(this));
					this.subGoals.push(new MoveEast(this));
				}

				// make a square, counter clockwise
				if (direction === 2) {
					console.log(`${actor.type} will make a counter-clockwise square`);
					this.subGoals.push(new MoveNorth(this));
					this.subGoals.push(new MoveWest(this));
					this.subGoals.push(new MoveSouth(this));
					this.subGoals.push(new MoveEast(this));
				}

				// move up, down, down, up.
				if (direction === 3) {
					console.log(`${actor.type} will wiggle vertically`);
					this.subGoals.push(new MoveNorth(this));
					this.subGoals.push(new MoveSouth(this));
					this.subGoals.push(new MoveSouth(this));
					this.subGoals.push(new MoveNorth(this));
				}
			// }

			success();
		});
	}

	isFinished() {
		return false;
	}
}
