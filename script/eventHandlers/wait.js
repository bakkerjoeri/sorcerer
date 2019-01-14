export const makeWait = emitEvent => (state, gameObject) => {
	return wait(state, gameObject, emitEvent);
}

export const wait = (state, gameObject, emitEvent) => {
	emitEvent('log', {}, `${gameObject.components.name} waits...`);

	return emitEvent('concludeTurn', state, gameObject);
}
