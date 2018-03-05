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
		return new Promise((succeed, fail) => {
			if (!actor.canMoveToPosition(this.position)) {
				return fail();
			}

			// calculate dijkstra map for position
			let dijkstraMap = new DijkstraMap(actor.level.size);
			dijkstraMap.findCellAtPosition(this.position).setAsTarget();
			
			let solidEntities = actor.level.getSolidEntitiesInBoundaries({x: 0, y: 0}, actor.level.size, [actor]);
			solidEntities.forEach((solidEntity) => {
				dijkstraMap.findCellAtPosition(solidEntity.positionInLevel).setPassability(false);
			});
			
			dijkstraMap.draw();
			dijkstraMap.calculate();
			dijkstraMap.draw();
			
			// roll down hill
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
			
			return succeed();
		});
	}

	isFinished(actor) {
		return actor.positionInLevel.x === this.position.x 
			&& actor.positionInLevel.y === this.position.y;
	}
}
