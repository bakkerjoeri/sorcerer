import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {updateComponentOfGameObject} from './../library/core/model/gameObjects.js';

export default class ActionTickerSystem extends System {
	constructor() {
		super();

		this.onEvent('beforeDraw', () => {
			this.findGameObjects(['positionInLevel', 'position']).forEach(updatePosition);
		});
	}
}

function updatePosition(gameObject) {
	let {positionInLevel} = gameObject.components;

	store.dispatch(updateComponentOfGameObject(gameObject.id, 'position', {
		x: positionInLevel.x * 16,
		y: positionInLevel.y * 16,
	}));
}
