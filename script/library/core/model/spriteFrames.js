import gameStateStore from './gameStateStore';

export const addSpriteFrame = spriteFrame => gameStateStore.dispatch(state => ({
	...state,
	spriteFrames: {
		...state.spriteFrames,
		[spriteFrame.id]: spriteFrame,
	},
}));

export const getSpriteFrameWithId = (spriteFrameId) => {
	return gameStateStore.getState().spriteFrames[spriteFrameId];
};
