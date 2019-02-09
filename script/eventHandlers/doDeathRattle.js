import {getAbilityWithName} from './../abilities/index.js';

export const doDeathRattle = (state, gameObject) => {
	let {currentLevelId, deathrattle} = gameObject.components;

	if (deathrattle && currentLevelId) {
		state = getAbilityWithName(deathrattle)(state, currentLevelId, gameObject);
	}

	return state;
}
