import System from './../library/core/module/System';
import store from './../library/core/model/gameStateStore';
import {updateComponentOfGameObject} from './../library/core/model/gameObjects'

export default class DamageSystem extends System {
	constructor() {
		super(['health']);

		this.observe('takeDamage', (gameObjects, game, damage) => {
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
