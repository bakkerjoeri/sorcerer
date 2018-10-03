import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {updateComponentOfGameObject} from './../library/core/model/gameObjects.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';

export default class ActionTickerSystem extends System {
	constructor() {
		super(entity => doesGameObjectHaveComponents(entity, ['positionInLevel', 'position']));

		this.observe('update', gameObjects => {
			gameObjects.forEach(updatePosition);
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
