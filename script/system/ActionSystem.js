import System from './../library/core/module/System';
import store from './../library/core/model/gameStateStore';
import choose from './../utility/random/choose';
import {
	doesPositionExistInLevel,
	moveEntityToPositionInLevel,
	getSolidEntitiesAtPositionInLevel,
} from './../module/Level';
import {updateComponentOfGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects'

export default class ActionTickerSystem extends System {
	constructor() {
		super(['actor', 'nonPlayer', 'canAct', 'positionInLevel']);

		this.observe('update', gameObjects => {
			gameObjects.forEach(act);
		});
	}
}

function act(gameObject) {
	let {positionInLevel, currentLevelId} = gameObject.components;

	let newPositionInLevel = choose([
		{x: positionInLevel.x, y: positionInLevel.y - 1},
		{x: positionInLevel.x + 1, y: positionInLevel.y},
		{x: positionInLevel.x, y: positionInLevel.y + 1},
		{x: positionInLevel.x - 1, y: positionInLevel.y},
	]);

	actTowardsPosition(gameObject, newPositionInLevel);
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
			console.log(`${gameObject.components.name} attacks ${entityToAttack.components.name}!`);
			return concludeAction(gameObject);
		}
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
