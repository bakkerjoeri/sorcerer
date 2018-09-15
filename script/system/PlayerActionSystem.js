import System from './../library/core/module/System';
import store from './../library/core/model/gameStateStore';
import {canEntityBeInPositionInLevel, moveEntityToPositionInLevel} from './../module/Level';
import {isKeyPressed} from './../library/core/module/Keyboard';
import {updateComponentOfGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects'

export default class PlayerControlSystem extends System {
	constructor() {
		super(['actor', 'player', 'canAct', 'positionInLevel']);

		this.observe('update', gameObjects => {
			gameObjects.forEach(act);
		});
	}
}

let hasPressedSpace = false;
let hasMovedUp = false;
let hasMovedRight = false;
let hasMovedDown = false;
let hasMovedLeft = false;

function act(gameObject) {
	let {positionInLevel} = gameObject.components;

	if (isKeyPressed(' ') && !hasPressedSpace) {
		hasPressedSpace = true;
		concludeAction(gameObject);
	} else if (!isKeyPressed(' ') && hasPressedSpace) {
		hasPressedSpace = false;
	}

	if (isKeyPressed('ArrowUp') && !hasMovedUp) {
		hasMovedUp = true;

		tryToMoveToNewPositionInLevel(gameObject, {
			x: positionInLevel.x,
			y: positionInLevel.y - 1,
		});
	} else if (!isKeyPressed('ArrowUp') && hasMovedUp) {
		hasMovedUp = false;
	}

	if (isKeyPressed('ArrowRight') && !hasMovedRight) {
		hasMovedRight = true;

		tryToMoveToNewPositionInLevel(gameObject, {
			x: positionInLevel.x + 1,
			y: positionInLevel.y,
		});
	} else if (!isKeyPressed('ArrowRight') && hasMovedRight) {
		hasMovedRight = false;
	}

	if (isKeyPressed('ArrowDown') && !hasMovedDown) {
		hasMovedDown = true;

		tryToMoveToNewPositionInLevel(gameObject, {
			x: positionInLevel.x,
			y: positionInLevel.y + 1,
		});
	} else if (!isKeyPressed('ArrowDown') && hasMovedDown) {
		hasMovedDown = false;
	}

	if (isKeyPressed('ArrowLeft') && !hasMovedLeft) {
		hasMovedLeft = true;

		tryToMoveToNewPositionInLevel(gameObject, {
			x: positionInLevel.x - 1,
			y: positionInLevel.y,
		});
	} else if (!isKeyPressed('ArrowLeft') && hasMovedLeft) {
		hasMovedLeft = false;
	}
}

function tryToMoveToNewPositionInLevel(gameObject, newPositionInLevel) {
	let {currentLevelId} = gameObject.components;
	if (canEntityBeInPositionInLevel(gameObject.id, newPositionInLevel, currentLevelId)) {
		moveEntityToPositionInLevel(gameObject.id, newPositionInLevel, currentLevelId);
		concludeAction(gameObject);
	}
}

function concludeAction(gameObject) {
	store.dispatch(removeComponentFromGameObject(gameObject.id, 'canAct'));
	store.dispatch(updateComponentOfGameObject(gameObject.id, 'actionTicker', {
		ticks: 100,
	}));
}
