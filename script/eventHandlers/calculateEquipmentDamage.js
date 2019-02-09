import { getGameObjectWithId } from './../library/core/model/gameObjects.js';

export const calculateEquipmentDamage = (state, damageEvent) => {
	let {attacker} = damageEvent;

	if (attacker.components.inventory) {
		let equippedItems = attacker.components.inventory.map((equippedItemId) => {
			return getGameObjectWithId(state, equippedItemId);
		});

		equippedItems.forEach((equippedItem) => {
			damageEvent.amount = damageEvent.amount + equippedItem.components.attack;
		});
	}

	return state;
}
