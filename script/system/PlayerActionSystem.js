import System from './../library/core/module/System';
import store from './../library/core/model/gameStateStore';
import {
	doesPositionExistInLevel,
	moveEntityToPositionInLevel,
	getSolidEntitiesAtPositionInLevel
} from './../module/Level';
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

		actTowardsPosition(gameObject, {
			x: positionInLevel.x,
			y: positionInLevel.y - 1,
		});
	} else if (!isKeyPressed('ArrowUp') && hasMovedUp) {
		hasMovedUp = false;
	}

	if (isKeyPressed('ArrowRight') && !hasMovedRight) {
		hasMovedRight = true;

		actTowardsPosition(gameObject, {
			x: positionInLevel.x + 1,
			y: positionInLevel.y,
		});
	} else if (!isKeyPressed('ArrowRight') && hasMovedRight) {
		hasMovedRight = false;
	}

	if (isKeyPressed('ArrowDown') && !hasMovedDown) {
		hasMovedDown = true;

		actTowardsPosition(gameObject, {
			x: positionInLevel.x,
			y: positionInLevel.y + 1,
		});
	} else if (!isKeyPressed('ArrowDown') && hasMovedDown) {
		hasMovedDown = false;
	}

	if (isKeyPressed('ArrowLeft') && !hasMovedLeft) {
		hasMovedLeft = true;

		actTowardsPosition(gameObject, {
			x: positionInLevel.x - 1,
			y: positionInLevel.y,
		});
	} else if (!isKeyPressed('ArrowLeft') && hasMovedLeft) {
		hasMovedLeft = false;
	}
}

function actTowardsPosition(gameObject, position) {
	let {currentLevelId} = gameObject.components;

	// Action can only happen towards a position that exists in the level.
	if (doesPositionExistInLevel(currentLevelId, position)) {
		let entitiesAtPosition = getSolidEntitiesAtPositionInLevel(currentLevelId, position, [gameObject.id]);

		// If there's nothing in the way, move to the position.
		if (entitiesAtPosition.length === 0) {
			moveEntityToPositionInLevel(gameObject.id, position, currentLevelId);
			return concludeAction(gameObject);
		}

		// Find an entity that can be attacked, if available.
		let entityToAttack = entitiesAtPosition.find((targetEntity) => {
			return targetEntity.components.hasOwnProperty('health');
		});

		// Attack and conclude the turn.
		if (entityToAttack) {
			console.log('Attack!', entityToAttack);
			return concludeAction(gameObject);
		}
	}
}

function concludeAction(gameObject) {
	store.dispatch(removeComponentFromGameObject(gameObject.id, 'canAct'));
	store.dispatch(updateComponentOfGameObject(gameObject.id, 'actionTicker', {
		ticks: 100,
	}));
}
