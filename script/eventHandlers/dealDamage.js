export const makeDealDamage = emitEvent => (state, damageEvent) => {
	return dealDamage(state, damageEvent, emitEvent);
}

export const dealDamage = (state, damageEvent, emitEvent) => {
	return emitEvent('takeDamage', state, damageEvent);
}
