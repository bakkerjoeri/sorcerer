import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {setComponentForGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects.js';
import {getAbilityWithName} from './../abilities/index.js';

export default class DamageSystem extends System {
	constructor() {
		super();

		this.onEvent('death', this.die);
	}

	die(gameObject) {
		let {currentLevelId, name, deathrattle} = gameObject.components;

		console.log(`${name} died!`);

		store.dispatch(removeComponentFromGameObject(gameObject.id, 'isVisible'));
		store.dispatch(removeComponentFromGameObject(gameObject.id, 'isSolid'));
		store.dispatch(setComponentForGameObject(gameObject.id, 'isDead', true));

		if (deathrattle && currentLevelId) {
			getAbilityWithName(deathrattle)(currentLevelId, gameObject);
		}
	}
}
