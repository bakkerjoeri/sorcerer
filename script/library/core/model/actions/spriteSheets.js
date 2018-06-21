export const addSpriteSheet = spriteSheet => state => ({
	...state,
	spriteSheets: {
		...state.spriteSheets,
		[spriteSheet.id]: spriteSheet,
	},
});
