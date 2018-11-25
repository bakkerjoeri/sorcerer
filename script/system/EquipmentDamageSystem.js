import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {getGameObjectWithId} from './../library/core/model/gameObjects.js';

export default class EquipmentDamageSystem extends System {
	constructor() {
		super();

		this.calculateEquipmentDamage = this.calculateEquipmentDamage.bind(this);

		this.onEvent('beforeDealDamage', this.calculateEquipmentDamage)
	}

	calculateEquipmentDamage(damageEvent) {
		let {attacker} = damageEvent;

		if (attacker.components.inventory) {
			let equippedItems = attacker.components.inventory.map((equippedItemId) => {
				return getGameObjectWithId(store.getState(), equippedItemId);
			});

			equippedItems.forEach((equippedItem) => {
				damageEvent.amount = damageEvent.amount + equippedItem.components.attack;
			});
		}
	}
}
