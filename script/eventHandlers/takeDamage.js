import {getGameObjectWithId, updateComponentOfGameObject} from './../library/core/model/gameObjects.js';

export const makeTakeDamage = emitEvent => (state, damageEvent) => {
	return takeDamage(state, damageEvent, emitEvent);
}

export const takeDamage = (state, damageEvent, emitEvent) => {
	let {target, amount} = damageEvent;
	let {health, name} = target.components;

	let newHealthAmount = health.current - amount;

	emitEvent('log', {}, `${name} takes ${amount} damage! (${health.current - amount}/${health.maximum})`);

	state = updateComponentOfGameObject(target.id, 'health', {
		current: newHealthAmount,
	})(state);

	state = emitEvent('hasTakenDamage', state, getGameObjectWithId(state, target.id));

	return state;
}
