import System from './../library/core/module/System';
import store from './../library/core/model/gameStateStore';
import choose from './../utility/random/choose';
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

export default class ActionTickerSystem extends System {
	constructor() {
		super(['actor', 'nonPlayer', 'canAct', 'positionInLevel']);

		this.observe('update', (gameObjects, game) => {
			gameObjects.forEach((gameObject) => {
				act(gameObject, game);
			});
		});
	}
}

function act(gameObject, game) {
	let {positionInLevel, currentLevelId} = gameObject.components;

	let newPositionInLevel = choose([
		{x: positionInLevel.x, y: positionInLevel.y - 1},
		{x: positionInLevel.x + 1, y: positionInLevel.y},
		{x: positionInLevel.x, y: positionInLevel.y + 1},
		{x: positionInLevel.x - 1, y: positionInLevel.y},
	]);

	actTowardsPosition(gameObject, newPositionInLevel, game);
	return concludeAction(gameObject);
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
