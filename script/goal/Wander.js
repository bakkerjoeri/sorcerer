import CellMap from 'module/CellMap';
import choose from 'random/choose';
import floodfill from 'utility/floodfill';
import Goal from 'module/Goal';
import MoveToPosition from 'goal/MoveToPosition';

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

	findPossiblePositionsInLevel(actor, level, fromPosition) {
		let cellMap = CellMap.createWithSize(level.size);

		level.forEachTileInBoundaries({x: 0, y: 0}, level.size, (tile) => {
			if ((tile.hasSolidEntities([actor]) || !actor.canMoveToPosition(tile.position)) && (tile.position.x !== fromPosition.x || tile.position.y !== fromPosition.y)) {
				cellMap.findCellAtPosition(tile.position).setPassability(false);
			}
		});

		let possibleCells = floodfill(cellMap, fromPosition);
		let possiblePositions = possibleCells.map(cell => cell.position);

		return possiblePositions;
	}
}
