import System from './../library/core/module/System';
import choose from './../utility/random/choose';
import {updateComponentOfGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects'

export default class ActionTickerSystem extends System {
	constructor() {
		super(['actor', 'nonPlayer', 'canAct', 'positionInLevel'], act);
	}
}

function act(gameObject) {
	let {positionInLevel} = gameObject.components;

	let newPositionInLevel = choose([
		{x: positionInLevel.x, y: positionInLevel.y - 1},
		{x: positionInLevel.x + 1, y: positionInLevel.y},
		{x: positionInLevel.x, y: positionInLevel.y + 1},
		{x: positionInLevel.x - 1, y: positionInLevel.y},
	]);

	updateComponentOfGameObject(gameObject.id, 'positionInLevel', newPositionInLevel);
	concludeAction(gameObject);
}

function concludeAction(gameObject) {
	removeComponentFromGameObject(gameObject.id, 'canAct');
	updateComponentOfGameObject(gameObject.id, 'actionTicker', {
		ticks: 100,
	});
}
