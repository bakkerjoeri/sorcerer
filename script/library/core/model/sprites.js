export const addSprite = sprite => state => ({
	...state,
	sprites: {
		...state.sprites,
		[sprite.id]: sprite,
	},
});

export const addSpriteFrameToSprite = (id, spriteFrameId) => state => ({
	...state,
	sprites: {
		...state.sprites,
		[id]: {
			...state.sprites[id],
			spriteFrames: [
				...state.sprites[id].spriteFrames,
				spriteFrameId,
			],
		},
	},
});

export const setCurrentFrameIndexForSprite = (id, currentFrameIndex) => state => ({
	...state,
	sprites: {
		...state.sprites,
		[id]: {
			...state.sprites[id],
			currentFrameIndex: currentFrameIndex,
		},
	},
});

export const getSprites = state => {
	return Object.values(state.sprites);
}

export const getSpriteWithId = (state, spriteId) => {
	return state.sprites[spriteId];
}
