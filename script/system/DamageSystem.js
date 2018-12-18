import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';
import {getGameObjectWithId, updateComponentOfGameObject} from './../library/core/model/gameObjects.js';

export default class DamageSystem extends System {
	constructor(game) {
		super(game);

		this.dealDamage = this.dealDamage.bind(this);
		this.takeDamage = this.takeDamage.bind(this);
		this.checkForDeath = this.checkForDeath.bind(this);

		this.onEvent('dealDamage', this.dealDamage);
		this.onEvent('takeDamage', this.takeDamage);
		this.onEvent('hasTakenDamage', this.checkForDeath);
	}

	dealDamage(damageEvent) {
		this.game.emitEventViaSystems('takeDamage', damageEvent);
	}

	takeDamage(damageEvent) {
		let {target, amount} = damageEvent;
		let {health, name} = target.components;

		let newHealthAmount = health.current - amount;

		this.game.emitEventViaSystems('log', `${name} takes ${amount} damage! (${health.current - amount}/${health.maximum})`);

		store.dispatch(updateComponentOfGameObject(target.id, 'health', {
			current: newHealthAmount,
		}));

		this.game.emitEventViaSystems('hasTakenDamage', getGameObjectWithId(store.getState(), target.id));
	}

	checkForDeath(gameObject) {
		if (doesGameObjectHaveComponents(gameObject, ['health'])
			&& gameObject.components.health.current <= 0
			&& !doesGameObjectHaveComponents(gameObject, ['isDead'])
		) {
			this.game.emitEventViaSystems('death', gameObject);
		}
	}
}
