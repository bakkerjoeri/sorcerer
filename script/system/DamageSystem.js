import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {updateComponentOfGameObject} from './../library/core/model/gameObjects.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';

export default class DamageSystem extends System {
	constructor() {
		super(entity => doesGameObjectHaveComponents(entity, ['health']));

		this.observe('takeDamage', (gameObjects, damage) => {
			gameObjects.forEach((gameObject) => {
				this.takeDamage(gameObject, damage)
			});
		});
	}

	takeDamage(gameObject, damage) {
		let {health, name} = gameObject.components;

		console.log(`${name} takes ${damage} damage! (${health.current - damage}/${health.maximum})`);
		store.dispatch(updateComponentOfGameObject(gameObject.id, 'health', {
			current: health.current - damage,
		}));
	}
}
