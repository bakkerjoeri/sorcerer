import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {setComponentForGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';
import {getAbilityWithName} from './../abilities/index.js';

export default class DamageSystem extends System {
	constructor() {
		super(entity => {
			return doesGameObjectHaveComponents(entity, ['health'])
				&& entity.components.health.current <= 0
				&& !doesGameObjectHaveComponents(entity, ['isDead'])
		});

		this.subscribe('update', gameObjects => {
			gameObjects.forEach(this.die);
		});
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
