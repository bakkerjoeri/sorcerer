import System from './../library/core/module/System';
import {updateComponentOfGameObject} from './../library/core/model/gameObjects'

export default class ActionTickerSystem extends System {
	constructor() {
		super(['positionInLevel', 'position'], updatePosition);
	}
}

function updatePosition(gameObject) {
	let {positionInLevel} = gameObject.components;

	updateComponentOfGameObject(gameObject.id, 'position', {
		x: positionInLevel.x * 16,
		y: positionInLevel.y * 16,
	});
}
