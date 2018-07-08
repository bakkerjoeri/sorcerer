import System from './../library/core/module/System';
import gameStateStore from './../library/core/model/gameStateStore';
import {isKeyPressed} from './../library/core/module/Keyboard';
import {getGameObjectsWithComponentNames} from './../library/core/model/gameObjects';
import {updateComponentOfGameObject, getComponentValueForGameObject} from './../library/core/model/gameObjects'

export default class ActionTickerSystem extends System {
	constructor() {
		super(['actor', 'actionTicker']);
	}

	update(gameObjects) {
		// loop through all gameObjects, reducing each' tick by 1.
		// when an gameObject reaches tick 0, stop looping and assign it `canAct`

		while (getGameObjectsWithComponentNames(gameStateStore.getState(), ['canAct']).length === 0) {
			for (let gameObject of gameObjects) {
				let actionTicker = getComponentValueForGameObject(gameStateStore.getState(), gameObject.id, 'actionTicker');

				if (actionTicker.ticks === 0) {
					gameStateStore.dispatch(updateComponentOfGameObject(gameObject.id, 'canAct', true));
				} else {
					gameStateStore.dispatch(updateComponentOfGameObject(gameObject.id, 'actionTicker', {
						ticks: actionTicker.ticks - 1,
					}));
				}
			}
		}

		super.update(gameObjects);
	}
}
