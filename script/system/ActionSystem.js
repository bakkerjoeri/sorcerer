import System from './../library/core/module/System';
import choose from './../utility/random/choose';
import {canEntityBeInPositionInLevel, moveEntityToPositionInLevel, canEntityMoveInLevel} from './../module/Level';
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

	if (!canEntityMoveInLevel(currentLevelId, gameObject.id)) {
		concludeAction(gameObject);
	}

	let newPositionInLevel = choose([
		{x: positionInLevel.x, y: positionInLevel.y - 1},
		{x: positionInLevel.x + 1, y: positionInLevel.y},
		{x: positionInLevel.x, y: positionInLevel.y + 1},
		{x: positionInLevel.x - 1, y: positionInLevel.y},
	]);

	if (canEntityBeInPositionInLevel(gameObject.id, newPositionInLevel, currentLevelId)) {
		moveEntityToPositionInLevel(gameObject.id, newPositionInLevel, currentLevelId);
		concludeAction(gameObject);
	}
}

function concludeAction(gameObject) {
	removeComponentFromGameObject(gameObject.id, 'canAct');
	updateComponentOfGameObject(gameObject.id, 'actionTicker', {
		ticks: 100,
	});
}
