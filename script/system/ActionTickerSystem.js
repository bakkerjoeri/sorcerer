import System from './../library/core/module/System';
import {getGameObjectsWithComponentNames} from './../library/core/model/gameObjects';
import {updateComponentOfGameObject, getComponentValueForGameObject} from './../library/core/model/gameObjects'

export default class ActionTickerSystem extends System {
	constructor() {
		super(['actor', 'actionTicker']);
	}

	updateGameObjects(gameObjects) {
		// loop through all gameObjects, reducing each' tick by 1.
		// when an gameObject reaches tick 0, stop looping and assign it `canAct`

		while (getGameObjectsWithComponentNames(['canAct']).length === 0) {
			for (let gameObject of gameObjects) {
				let actionTicker = getComponentValueForGameObject(gameObject.id, 'actionTicker');

				if (actionTicker.ticks === 0) {
					updateComponentOfGameObject(gameObject.id, 'canAct', true);
				} else {
					updateComponentOfGameObject(gameObject.id, 'actionTicker', {
						ticks: actionTicker.ticks - 1,
					});
				}
			}
		}

		super.updateGameObjects(gameObjects);
	}
}
