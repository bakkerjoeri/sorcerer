import Goal from 'module/Goal';
import MoveToPosition from 'goal/MoveToPosition';
import DijkstraMap from 'module/DijkstraMap';
import choose from 'random/choose';

export default class Wander extends Goal {
	takeAction(actor) {
		return new Promise((succeed) => {
			if (!actor.canMove()) {
				actor.wait();
				return succeed();
			}
			
			let possiblePositions = this.findPossiblePositionsInLevel(actor, actor.level, actor.positionInLevel);
			
			if (possiblePositions.length === 0) {
				actor.wait();
				return succeed();
			}
			
			this.subGoals.push(new MoveToPosition(choose(possiblePositions), this));
			
			return succeed();
		});
	}

	isFinished() {
		return false;
	}
	
	findPossiblePositionsInLevel(actor, level, startingPosition) {
		let possiblePositions = [];
		
		// calculate dijkstra map for position
		let dijkstraMap = new DijkstraMap(level.size);
		dijkstraMap.findCellAtPosition(startingPosition).setAsTarget();
		
		level.forEachTileInBoundaries({x: 0, y: 0}, level.size, (tile) => {
			if (tile.hasSolidEntities([actor]) && (tile.position.x !== startingPosition.x || tile.position.y !== startingPosition.y)) {
				dijkstraMap.findCellAtPosition(tile.position).setPassability(false);
			}
		});
		
		dijkstraMap.draw();
		dijkstraMap.calculate();
		dijkstraMap.draw();
		
		// Check if the starting position is part of the possible positions.
		if (dijkstraMap.findCellAtPosition(startingPosition).weight !== Infinity) {
			// Flood fill to find all possible positions.
			dijkstraMap.forEachCell((cell) => {
				if (cell.weight !== Infinity && cell.passable) {
					possiblePositions.push(cell.position);
				}
			});
		}
		
		return possiblePositions;
	}
}
