import {
	updateComponentOfGameObject,
	removeComponentFromGameObject
} from './../library/core/model/gameObjects.js';

export const concludeTurn = (state, gameObject) => {
	state = removeComponentFromGameObject(gameObject.id, 'canAct')(state);
	state = updateComponentOfGameObject(gameObject.id, 'actionTicker', {
		ticks: 100,
	})(state);
}
