import Goal from 'module/Goal';
import DijkstraMap from 'module/DijkstraMap';
import MoveNorth from 'goal/MoveNorth';
import MoveEast from 'goal/MoveEast';
import MoveSouth from 'goal/MoveSouth';
import MoveWest from 'goal/MoveWest';

export default class MoveToPosition extends Goal {
	constructor(position, originalGoal) {
		super(originalGoal);

		this.position = position;
	}

	takeAction(actor) {
		if (!actor.canMoveToPosition(this.position)) {
			return false;
		}

		// calculate dijkstra map for position
		let dijkstraMap = DijkstraMap.createWithSize(actor.level.size);

		dijkstraMap.findCellAtPosition(this.position).setWeight(0);
		actor.level.forEachTileInBoundaries({x: 0, y: 0}, actor.level.size, (tile) => {
			if (tile.hasSolidEntities([actor]) || !actor.canMoveToPosition(tile.position)) {
				dijkstraMap.findCellAtPosition(tile.position).setPassability(false);
			}
		});

		dijkstraMap.calculate();

		// Check if the creature can move to the chosen location
		if (dijkstraMap.findCellAtPosition(actor.positionInLevel).weight === Infinity) {
			return false;
		}

		// Create goals from the path
		let previousPosition = actor.positionInLevel;

		dijkstraMap.findPath(actor.positionInLevel, (nextPosition) => {
			if (previousPosition.y < nextPosition.y) {
				this.subGoals.push(new MoveSouth(this));
			}

			if (previousPosition.x < nextPosition.x) {
				this.subGoals.push(new MoveEast(this));
			}

			if (previousPosition.y > nextPosition.y) {
				this.subGoals.push(new MoveNorth(this));
			}

			if (previousPosition.x > nextPosition.x) {
				this.subGoals.push(new MoveWest(this));
			}

			previousPosition = nextPosition;
		});

		return true;
	}

	isFinished(actor) {
		return actor.positionInLevel.x === this.position.x
			&& actor.positionInLevel.y === this.position.y;
	}
}
