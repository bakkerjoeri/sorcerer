import {
	removeGameObjectFromPositionInLevel,
	getEntitiesAtBoundariesInLevel,
} from './../module/Level.js';
import {
	setComponentForGameObject,
	removeComponentFromGameObject
} from './../library/core/model/gameObjects.js';

export const makePickUp = (emitEvent) => (state, gameObject) => {
	return pickUp(state, gameObject, emitEvent);
}

export const pickUp = (state, gameObject, emitEvent) => {
	let {currentLevelId, positionInLevel, sizeInLevel} = gameObject.components;

	let itemToPickUp = getEntitiesAtBoundariesInLevel(
		state, currentLevelId, positionInLevel, sizeInLevel, [gameObject.id]
	).find((gameObject) => { return gameObject.components.isItem });

	if (itemToPickUp) {
		// Move first item found into inventory
		state = setComponentForGameObject(gameObject.id, 'inventory', [
			...gameObject.components.inventory,
			itemToPickUp.id,
		])(state);

		// Remove item from the level
		state = removeGameObjectFromPositionInLevel(
			state,
			itemToPickUp,
			itemToPickUp.components.currentLevelId,
			itemToPickUp.components.positionInLevel
		);

		state = removeComponentFromGameObject(itemToPickUp.id, 'isVisible')(state);

		emitEvent('log', {}, `${gameObject.components.name} picks up ${itemToPickUp.components.name}`);

		return emitEvent('concludeTurn', state, gameObject);
	}
}
