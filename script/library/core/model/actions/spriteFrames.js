export const addSpriteFrame = spriteFrame => state => ({
	...state,
	spriteFrames: {
		...state.spriteFrames,
		[spriteFrame.id]: spriteFrame,
	},
});
