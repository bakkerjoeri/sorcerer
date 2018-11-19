import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {
	moveEntityToPositionInLevel,
	canEntityBeAtPositionInLevel,
	getEntitiesAtBoundariesInLevel,
} from './../module/Level.js';
import {
	updateComponentOfGameObject,
	removeComponentFromGameObject
} from './../library/core/model/gameObjects.js';
import {
	doesGameObjectHaveComponents,
} from './../library/core/module/GameObject.js';

export default class ActionTickerSystem extends System {
	constructor() {
		super();

		this.entityActsTowardsPosition = this.entityActsTowardsPosition.bind(this);
		this.entityWaits = this.entityWaits.bind(this);
		this.entityConcludesTurn = this.entityConcludesTurn.bind(this);

		this.onEvent('actWait', this.entityWaits);
		this.onEvent('actTowardsPosition', this.entityActsTowardsPosition)
		this.onEvent('concludeTurn', this.entityConcludesTurn)
	}

	entityActsTowardsPosition(entity, newPositionInLevel) {
		let {currentLevelId} = entity.components;

		if (canEntityBeAtPositionInLevel(currentLevelId, entity.id, newPositionInLevel)) {
			moveEntityToPositionInLevel(entity.id, newPositionInLevel, currentLevelId);

			this.game.emitEvent('concludeTurn', entity);
			return;
		}

		let attackTarget = getAttackTargetForPositionInLevel(currentLevelId, entity, newPositionInLevel);

		if (attackTarget) {
			this.game.emitEvent('attackTarget', entity, attackTarget);

			this.game.emitEvent('concludeTurn', entity);
			return;
		}

		this.entityWaits(entity);
		return;
	}

	entityWaits(entity) {
		console.log(`${entity.components.name} waits...`);
		this.game.emitEvent('concludeTurn', entity);
	}

	entityConcludesTurn(entity) {
		store.dispatch(removeComponentFromGameObject(entity.id, 'canAct'));
		store.dispatch(updateComponentOfGameObject(entity.id, 'actionTicker', {
			ticks: 200,
		}));
	}
}

function getAttackTargetForPositionInLevel(levelId, gameObject, positionToAttack) {
	let {sizeInLevel} = gameObject.components;

	let entitiesInBoundaries = getEntitiesAtBoundariesInLevel(levelId, positionToAttack, sizeInLevel, [gameObject.id])
	let attackableEntities = entitiesInBoundaries.filter((entity) => {
		return doesGameObjectHaveComponents(entity, ['health'])
			&& !doesGameObjectHaveComponents(entity, ['isDead']);
	});

	if (attackableEntities.length === 0) {
		return;
	}

	return attackableEntities[0];
}
