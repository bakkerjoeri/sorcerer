import System from './../library/core/module/System';
import store from './../library/core/model/gameStateStore';
import {setComponentForGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects'
import {getAbilityWithName} from './../abilities';

export default class DamageSystem extends System {
	constructor() {
		super(['health']);

		this.observe('update', gameObjects => {
			gameObjects.forEach(this.checkForDeath);
		});
	}

	checkForDeath(gameObject) {
		let {isDead, currentLevelId, health, name, deathrattle} = gameObject.components;

		if (!isDead && health.current <= 0) {
			console.log(`${name} died!`);

			store.dispatch(removeComponentFromGameObject(gameObject.id, 'isVisible'));
			store.dispatch(removeComponentFromGameObject(gameObject.id, 'isSolid'));
			store.dispatch(setComponentForGameObject(gameObject.id, 'isDead', true));

			if (deathrattle) {
				getAbilityWithName(deathrattle)(currentLevelId, gameObject);
			}
		}
	}
}
