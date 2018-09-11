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

export const getAllSprites = (state) => {
	return Object.values(state.sprites);
};

export const getSpriteWithId = (state, spriteId) => {
	let sprite = state.sprites[spriteId];

	if (!sprite) {
		throw new Error(`No sprite with id "${spriteId}" found.`)
	}

	return state.sprites[spriteId];
};
