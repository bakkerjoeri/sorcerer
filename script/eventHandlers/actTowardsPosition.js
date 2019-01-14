import {
	canEntityBeAtPositionInLevel,
	moveGameObjectToPositionInLevel,
	getEntitiesAtBoundariesInLevel,
} from './../module/Level.js';

import {
	doesGameObjectHaveComponents,
} from './../library/core/module/GameObject.js';

export const makeActTowardsPosition = (emitEvent) => (state, gameObject, newPositionInLevel) => {
	return actTowardsPosition(state, gameObject, newPositionInLevel, emitEvent);
}

export const actTowardsPosition = (state, gameObject, newPositionInLevel, emitEvent) => {
	let {currentLevelId} = gameObject.components;

	if (canEntityBeAtPositionInLevel(state, currentLevelId, gameObject.id, newPositionInLevel)) {
		moveGameObjectToPositionInLevel(state, gameObject.id, newPositionInLevel, currentLevelId);

		return emitEvent('concludeTurn', state, gameObject);
	}

	let attackTarget = getAttackTargetForPositionInLevel(state, currentLevelId, gameObject, newPositionInLevel);

	if (attackTarget) {
		let attackEvent = {
			attacker: gameObject,
			target: attackTarget,
		};

		state = emitEvent('attackTarget', state, attackEvent);
		state = emitEvent('concludeTurn', state, gameObject);

		return state;
	}

	return emitEvent('actWait', state, gameObject);
}

function getAttackTargetForPositionInLevel(state, levelId, gameObject, positionToAttack) {
	let {sizeInLevel} = gameObject.components;

	let entitiesInBoundaries = getEntitiesAtBoundariesInLevel(
		state, levelId, positionToAttack, sizeInLevel, [gameObject.id]
	);

	return entitiesInBoundaries.find((entity) => {
		return doesGameObjectHaveComponents(entity, ['health'])
			&& !doesGameObjectHaveComponents(entity, ['isDead']);
	});
}
