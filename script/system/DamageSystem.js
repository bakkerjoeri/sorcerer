import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';
import {updateComponentOfGameObject} from './../library/core/model/gameObjects.js';

export default class DamageSystem extends System {
	constructor() {
		super();

		this.takeDamage = this.takeDamage.bind(this);
		this.checkForDeath = this.checkForDeath.bind(this);

		this.onEvent('takeDamage', this.takeDamage);
		this.onEvent('hasTakenDamage', this.checkForDeath);
	}

	takeDamage(gameObject, damage) {
		let {health, name} = gameObject.components;
		let newHealthAmount = health.current - damage;

		console.log(`${name} takes ${damage} damage! (${health.current - damage}/${health.maximum})`);

		store.dispatch(updateComponentOfGameObject(gameObject.id, 'health', {
			current: newHealthAmount,
		}));

		this.game.emitEvent('hasTakenDamage', gameObject);
	}

	checkForDeath(gameObject) {
		if (doesGameObjectHaveComponents(gameObject, ['health'])
			&& gameObject.components.health.current <= 0
			&& !doesGameObjectHaveComponents(gameObject, ['isDead'])
		) {
			this.game.emitEvent('death', gameObject);
		}
	}
}
