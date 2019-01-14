export const makeAttackTarget = (emitEvent) => (state, attackEvent) => {
	return attackTarget(state, attackEvent, emitEvent);
}

export const attackTarget = (state, attackEvent, emitEvent) => {
	let damageEvent = {
		attacker: attackEvent.attacker,
		target: attackEvent.target,
		amount: attackEvent.attacker.components.baseAttack,
		types: [],
	};

	state = emitEvent('beforeDealDamage', state, damageEvent);
	state = emitEvent('dealDamage', state, damageEvent);

	return state;
}
