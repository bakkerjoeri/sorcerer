export const ADD_SPRITE_SHEET = 'ADD_SPRITE_SHEET';
export function addSpriteSheet(spriteSheet) {
	return {
		type: ADD_SPRITE_SHEET,
		spriteSheet,
	};
}
