export const addSpriteSheet = spriteSheet => state => ({
	...state,
	spriteSheets: {
		...state.spriteSheets,
		[spriteSheet.id]: spriteSheet,
	},
});

export const getSpriteSheetWithId = (state, spriteSheetId) => {
	return state.spriteSheets[spriteSheetId];
}
