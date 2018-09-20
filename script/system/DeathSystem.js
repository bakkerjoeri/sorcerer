import System from './../library/core/module/System';
import store from './../library/core/model/gameStateStore';
import {setComponentForGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects'
import createGrave from './../abilities/deathrattles/createGrave';

export default class DamageSystem extends System {
	constructor() {
		super(['health']);

		this.observe('update', gameObjects => {
			gameObjects.forEach(this.checkForDeath);
		});
	}

	checkForDeath(gameObject) {
		let {isDead, currentLevelId, health, name} = gameObject.components;

		if (!isDead && health.current <= 0) {
			console.log(`${name} died!`);

			store.dispatch(removeComponentFromGameObject(gameObject.id, 'isVisible'));
			store.dispatch(removeComponentFromGameObject(gameObject.id, 'isSolid'));
			store.dispatch(setComponentForGameObject(gameObject.id, 'isDead', true));

			createGrave(currentLevelId, gameObject);
		}
	}
}
