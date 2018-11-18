import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {getGameObjectsWithComponentNames, updateComponentOfGameObject, getComponentValueForGameObject} from './../library/core/model/gameObjects.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';

export default class ActionTickerSystem extends System {
	constructor() {
		super();

		this.onEvent('update', () => {
			let gameObjectsToUpdate = this.findGameObjects().filter((gameObject) => {
				return doesGameObjectHaveComponents(gameObject, ['actor', 'actionTicker'])
					&& !doesGameObjectHaveComponents(gameObject, ['isDead']);
			});

			updateTicks(gameObjectsToUpdate);
		});
	}
}

function updateTicks(gameObjects) {
	// loop through all gameObjects, reducing each' tick by 1.
	// when an gameObject reaches tick 0, stop looping and assign it `canAct`

	while (getGameObjectsWithComponentNames(store.getState(), ['canAct']).length === 0) {
		for (let gameObject of gameObjects) {
			let actionTicker = getComponentValueForGameObject(store.getState(), gameObject.id, 'actionTicker');

			if (actionTicker.ticks === 0) {
				store.dispatch(updateComponentOfGameObject(gameObject.id, 'canAct', true));
			} else {
				store.dispatch(updateComponentOfGameObject(gameObject.id, 'actionTicker', {
					ticks: actionTicker.ticks - 1,
				}));
			}
		}
	}
}
