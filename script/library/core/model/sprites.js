import gameStateStore from './gameStateStore';
import createAction from './../../store/createAction';
import createSelector from './../../store/createSelector';

export const addSprite = sprite => createAction(gameStateStore, state => ({
	...state,
	sprites: {
		...state.sprites,
		[sprite.id]: sprite,
	},
}));

export const addSpriteFrameToSprite = (id, spriteFrameId) => createAction(gameStateStore, state => ({
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

export const getSprites = () => createSelector(gameStateStore, state => {
	return Object.values(state.sprites);
});

export const getSpriteWithId = (spriteId) => createSelector(gameStateStore, state => {
	return state.sprites[spriteId];
});
