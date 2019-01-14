import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';

export const makeCheckForDeath = emitEvent => (state, gameObject) => {
	return checkForDeath(state, gameObject, emitEvent);
}

export function checkForDeath(state, gameObject, emitEvent) {
	if (doesGameObjectHaveComponents(gameObject, ['health'])
		&& gameObject.components.health.current <= 0
		&& !doesGameObjectHaveComponents(gameObject, ['isDead'])
	) {
		return emitEvent('death', state, gameObject);
	}

	return state;
}
