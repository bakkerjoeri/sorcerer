import System from './../library/core/module/System';
import store from './../library/core/model/gameStateStore';
import {
	moveEntityToPositionInLevel,
	canEntityBeAtPositionInLevel,
	getEntitiesAtBoundariesInLevel,
} from './../module/Level';
import {
	updateComponentOfGameObject,
	removeComponentFromGameObject
} from './../library/core/model/gameObjects';
import {
	doesGameObjectHaveComponent,
} from './../library/core/module/GameObject';
import {isKeyPressed} from './../library/core/module/Keyboard';

export default class PlayerControlSystem extends System {
	constructor() {
		super(['actor', 'player', 'canAct', 'positionInLevel']);

		this.observe('update', (gameObjects, game) => {
			gameObjects.forEach((gameObject) => {
				act(gameObject, game);
			});
		});
	}
}

let hasPressedSpace = false;
let hasMovedUp = false;
let hasMovedRight = false;
let hasMovedDown = false;
let hasMovedLeft = false;

function act(gameObject, game) {
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
		}, game);
	} else if (!isKeyPressed('ArrowUp') && hasMovedUp) {
		hasMovedUp = false;
	}

	if (isKeyPressed('ArrowRight') && !hasMovedRight) {
		hasMovedRight = true;

		actTowardsPosition(gameObject, {
			x: positionInLevel.x + 1,
			y: positionInLevel.y,
		}, game);
	} else if (!isKeyPressed('ArrowRight') && hasMovedRight) {
		hasMovedRight = false;
	}

	if (isKeyPressed('ArrowDown') && !hasMovedDown) {
		hasMovedDown = true;

		actTowardsPosition(gameObject, {
			x: positionInLevel.x,
			y: positionInLevel.y + 1,
		}, game);
	} else if (!isKeyPressed('ArrowDown') && hasMovedDown) {
		hasMovedDown = false;
	}

	if (isKeyPressed('ArrowLeft') && !hasMovedLeft) {
		hasMovedLeft = true;

		actTowardsPosition(gameObject, {
			x: positionInLevel.x - 1,
			y: positionInLevel.y,
		}, game);
	} else if (!isKeyPressed('ArrowLeft') && hasMovedLeft) {
		hasMovedLeft = false;
	}
}

function actTowardsPosition(gameObject, position, game) {
	let {currentLevelId} = gameObject.components;

	if (canEntityBeAtPositionInLevel(currentLevelId, gameObject.id, position)) {
		moveEntityToPositionInLevel(gameObject.id, position, currentLevelId);

		return concludeAction(gameObject);
	}

	let attackTarget = getAttackTargetForPositionInLevel(currentLevelId, gameObject, position);

	if (attackTarget) {
		game.notify('takeDamage', [attackTarget], 1);

		return concludeAction(gameObject);
	}

	console.log(`${gameObject.components.name} waits...`);

	return concludeAction(gameObject);
}

function concludeAction(gameObject) {
	store.dispatch(removeComponentFromGameObject(gameObject.id, 'canAct'));
	store.dispatch(updateComponentOfGameObject(gameObject.id, 'actionTicker', {
		ticks: 100,
	}));
}

function getAttackTargetForPositionInLevel(levelId, gameObject, positionToAttack) {
	let {sizeInLevel} = gameObject.components;

	let entitiesInBoundaries = getEntitiesAtBoundariesInLevel(levelId, positionToAttack, sizeInLevel, [gameObject.id])
	let attackableEntities = entitiesInBoundaries.filter((entity) => {
		return doesGameObjectHaveComponent(entity, 'health');
	});

	if (attackableEntities.length === 0) {
		return;
	}

	return attackableEntities[0];
}
