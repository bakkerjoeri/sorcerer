import gameStateStore from './gameStateStore';

export const addSprite = sprite => gameStateStore.dispatch(state => ({
	...state,
	sprites: {
		...state.sprites,
		[sprite.id]: sprite,
	},
}));

export const addSpriteFrameToSprite = (id, spriteFrameId) => gameStateStore.dispatch(state => ({
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
}));

export const getSprites = () => {
	return Object.values(gameStateStore.getState().sprites);
};

export const getSpriteWithId = (spriteId) => {
	return gameStateStore.getState().sprites[spriteId];
};
