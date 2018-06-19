export function getSprites(state) {
	return Object.values(state.sprites);
}

export function getSpriteWithId(state, spriteId) {
	return state.sprites[spriteId];
}
