export const addSpriteFrame = spriteFrame => state => ({
	...state,
	spriteFrames: {
		...state.spriteFrames,
		[spriteFrame.id]: spriteFrame,
	},
});

export const getSpriteFrameWithId = (state, spriteFrameId) => {
	return state.spriteFrames[spriteFrameId];
};
