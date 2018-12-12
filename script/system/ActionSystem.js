import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {
	moveEntityToPositionInLevel,
	removeEntityFromPositionInLevel,
	canEntityBeAtPositionInLevel,
	getEntitiesAtBoundariesInLevel,
} from './../module/Level.js';
import {
	setComponentForGameObject,
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
		this.entityPicksUp = this.entityPicksUp.bind(this);
		this.entityConcludesTurn = this.entityConcludesTurn.bind(this);

		this.onEvent('actWait', this.entityWaits);
		this.onEvent('actPickUp', this.entityPicksUp);
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
			let attackEvent = {
				attacker: entity,
				target: attackTarget,
			};

			this.game.emitEvent('attackTarget', attackEvent);

			this.game.emitEvent('concludeTurn', entity);
			return;
		}

		this.entityWaits(entity);
		return;
	}

	entityPicksUp(entity) {
		let {currentLevelId, positionInLevel, sizeInLevel} = entity.components;

		let itemToPickUp = getEntitiesAtBoundariesInLevel(currentLevelId, positionInLevel, sizeInLevel, [entity.id])
			.find((entity) => { return entity.components.isItem });

		if (itemToPickUp) {
			// Move first item found into inventory
			store.dispatch(setComponentForGameObject(entity.id, 'inventory', [
				...entity.components.inventory,
				itemToPickUp.id,
			]));

			// Remove item from the level
			removeEntityFromPositionInLevel(itemToPickUp.id, itemToPickUp.components.currentLevelId, itemToPickUp.components.positionInLevel);
			store.dispatch(removeComponentFromGameObject(itemToPickUp.id, 'isVisible'));

			this.game.emitEvent('log', `${entity.components.name} picks up ${itemToPickUp.components.name}`);

			this.entityConcludesTurn(entity);
		}
	}

	entityWaits(entity) {
		this.game.emitEvent('log', `${entity.components.name} waits...`);
		this.game.emitEvent('concludeTurn', entity);
	}

	entityConcludesTurn(entity) {
		store.dispatch(removeComponentFromGameObject(entity.id, 'canAct'));
		store.dispatch(updateComponentOfGameObject(entity.id, 'actionTicker', {
			ticks: 100,
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
