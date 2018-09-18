import System from './../library/core/module/System';
import store from './../library/core/model/gameStateStore';
import choose from './../utility/random/choose';
import {
	moveEntityToPositionInLevel,
	canEntityMoveToPositionInLevel,
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

	// actTowardsPosition(gameObject, newPositionInLevel);
	return concludeAction(gameObject);
}

function actTowardsPosition(gameObject, position) {
	let {currentLevelId} = gameObject.components;

	if (canEntityMoveToPositionInLevel(currentLevelId, gameObject.id, position)) {
		moveEntityToPositionInLevel(gameObject.id, position, currentLevelId);
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
