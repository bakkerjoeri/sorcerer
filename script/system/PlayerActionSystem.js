import System from './../library/core/module/System';
import gameStateStore from './../library/core/model/gameStateStore';
import {isKeyPressed} from './../library/core/module/Keyboard';
import {updateComponentOfEntity, removeComponentFromEntity} from './../library/core/model/entities'
import canMoveFromPositionToPosition from './../canMoveFromPositionToPosition';

export default class PlayerControlSystem extends System {
	constructor() {
		super(['actor', 'player', 'canAct', 'position'], act);
	}
}

let hasMovedUp = false;
let hasMovedRight = false;
let hasMovedDown = false;
let hasMovedLeft = false;

function act(entity) {
	let {position} = entity.components;

	if (isKeyPressed('Space')) {
		concludeAction(entity);
	}

	if (isKeyPressed('ArrowUp') && !hasMovedUp) {
		hasMovedUp = true;

		tryToMoveToNewPosition(entity, {
			x: position.x,
			y: position.y - 16,
		});
	} else if (!isKeyPressed('ArrowUp') && hasMovedUp) {
		hasMovedUp = false;
	}

	if (isKeyPressed('ArrowRight') && !hasMovedRight) {
		hasMovedRight = true;

		tryToMoveToNewPosition(entity, {
			x: position.x + 16,
			y: position.y,
		});
	} else if (!isKeyPressed('ArrowRight') && hasMovedRight) {
		hasMovedRight = false;
	}

	if (isKeyPressed('ArrowDown') && !hasMovedDown) {
		hasMovedDown = true;

		tryToMoveToNewPosition(entity, {
			x: position.x,
			y: position.y + 16,
		});
	} else if (!isKeyPressed('ArrowDown') && hasMovedDown) {
		hasMovedDown = false;
	}

	if (isKeyPressed('ArrowLeft') && !hasMovedLeft) {
		hasMovedLeft = true;

		tryToMoveToNewPosition(entity, {
			x: position.x - 16,
			y: position.y,
		});
	} else if (!isKeyPressed('ArrowLeft') && hasMovedLeft) {
		hasMovedLeft = false;
	}
}

function tryToMoveToNewPosition(entity, newPosition) {
	let {position} = entity.components;

	if (canMoveFromPositionToPosition(position, newPosition)) {
		gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'position', newPosition));
		concludeAction(entity);
	}
}

function concludeAction(entity) {
	gameStateStore.dispatch(removeComponentFromEntity(entity.id, 'canAct'));
	gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'actionTicker', {
		ticks: 100,
	}));
}
