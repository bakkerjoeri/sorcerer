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
		super(entity => doesGameObjectHaveComponents(entity, ['actor', 'canAct', 'positionInLevel']));

		this.entityActsTowardsPosition = this.entityActsTowardsPosition.bind(this);
		this.entityWaits = this.entityWaits.bind(this);
		this.entityConcludesTurn = this.entityConcludesTurn.bind(this);

		this.observe('actWait', gameObjects => {
			gameObjects.forEach(this.entityWaits);
		});

		this.observe('actTowardsPosition', (gameObjects, newPositionInLevel) => {
			gameObjects.forEach((gameObject) => {
				this.entityActsTowardsPosition(gameObject, newPositionInLevel);
			});
		});
	}

	entityActsTowardsPosition(entity, newPositionInLevel) {
		let {currentLevelId} = entity.components;

		if (canEntityBeAtPositionInLevel(currentLevelId, entity.id, newPositionInLevel)) {
			moveEntityToPositionInLevel(entity.id, newPositionInLevel, currentLevelId);

			return this.entityConcludesTurn(entity);
		}

		let attackTarget = getAttackTargetForPositionInLevel(currentLevelId, entity, newPositionInLevel);

		if (attackTarget) {
			this.game.notify('takeDamage', [attackTarget], 1);

			return this.entityConcludesTurn(entity);
		}

		return this.entityWaits(entity);
	}

	entityWaits(entity) {
		console.log(`${entity.components.name} waits...`);
		return this.entityConcludesTurn(entity);
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
