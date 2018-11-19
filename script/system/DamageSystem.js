import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';
import {getGameObjectWithId, updateComponentOfGameObject} from './../library/core/model/gameObjects.js';

export default class DamageSystem extends System {
	constructor() {
		super();

		this.dealDamage = this.dealDamage.bind(this);
		this.takeDamage = this.takeDamage.bind(this);
		this.checkForDeath = this.checkForDeath.bind(this);

		this.onEvent('attackTarget', this.dealDamage);
		this.onEvent('takeDamage', this.takeDamage);
		this.onEvent('hasTakenDamage', this.checkForDeath);
	}

	dealDamage(attacker, target) {
		let damage = 1;

		if (attacker.components.inventory) {
			let equippedItems = attacker.components.inventory.map((equippedItemId) => {
				return getGameObjectWithId(store.getState(), equippedItemId);
			});

			damage = equippedItems.reduce((totalDamage, equippedItem) => {
				if (equippedItem.components.attack) {
					return totalDamage + equippedItem.components.attack;
				}

				return totalDamage;
			}, 0);
		}


		this.game.emitEvent('takeDamage', target, damage);
	}

	takeDamage(target, damage) {
		let {health, name} = target.components;
		let newHealthAmount = health.current - damage;

		console.log(`${name} takes ${damage} damage! (${health.current - damage}/${health.maximum})`);

		store.dispatch(updateComponentOfGameObject(target.id, 'health', {
			current: newHealthAmount,
		}));

		this.game.emitEvent('hasTakenDamage', getGameObjectWithId(store.getState(), target.id));
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
