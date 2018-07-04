import System from './../library/core/module/System';
import gameStateStore from './../library/core/model/gameStateStore';
import {isKeyPressed} from './../library/core/module/Keyboard';
import {updateComponentOfEntity, removeComponentFromEntity} from './../library/core/model/entities'
import canMoveFromPositionToPosition from './../canMoveFromPositionToPosition';

export default class PlayerControlSystem extends System {
	constructor() {
		super(['actor', 'player', 'canAct', 'positionInLevel'], act);
	}
}

let hasMovedUp = false;
let hasMovedRight = false;
let hasMovedDown = false;
let hasMovedLeft = false;

function act(entity) {
	let {positionInLevel} = entity.components;

	if (isKeyPressed('Space')) {
		concludeAction(entity);
	}

	if (isKeyPressed('ArrowUp') && !hasMovedUp) {
		hasMovedUp = true;

		tryToMoveToNewPositionInLevel(entity, {
			x: positionInLevel.x,
			y: positionInLevel.y - 1,
		});
	} else if (!isKeyPressed('ArrowUp') && hasMovedUp) {
		hasMovedUp = false;
	}

	if (isKeyPressed('ArrowRight') && !hasMovedRight) {
		hasMovedRight = true;

		tryToMoveToNewPositionInLevel(entity, {
			x: positionInLevel.x + 1,
			y: positionInLevel.y,
		});
	} else if (!isKeyPressed('ArrowRight') && hasMovedRight) {
		hasMovedRight = false;
	}

	if (isKeyPressed('ArrowDown') && !hasMovedDown) {
		hasMovedDown = true;

		tryToMoveToNewPositionInLevel(entity, {
			x: positionInLevel.x,
			y: positionInLevel.y + 1,
		});
	} else if (!isKeyPressed('ArrowDown') && hasMovedDown) {
		hasMovedDown = false;
	}

	if (isKeyPressed('ArrowLeft') && !hasMovedLeft) {
		hasMovedLeft = true;

		tryToMoveToNewPositionInLevel(entity, {
			x: positionInLevel.x - 1,
			y: positionInLevel.y,
		});
	} else if (!isKeyPressed('ArrowLeft') && hasMovedLeft) {
		hasMovedLeft = false;
	}
}

function tryToMoveToNewPositionInLevel(entity, newPositionInLevel) {
	let {positionInLevel} = entity.components;

	gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'positionInLevel', newPositionInLevel));
	concludeAction(entity);

	// if (canMoveFromPositionToPosition(positionInLevel, newPositionInLevel)) {
	// 	gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'positionInLevel', newPositionInLevel));
	// 	concludeAction(entity);
	// }
}

function concludeAction(entity) {
	gameStateStore.dispatch(removeComponentFromEntity(entity.id, 'canAct'));
	gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'actionTicker', {
		ticks: 100,
	}));
}
