export const ADD_SPRITE_FRAME = 'ADD_SPRITE_FRAME';
export function addSpriteFrame(spriteFrame) {
	return {
		type: ADD_SPRITE_FRAME,
		spriteFrame,
	};
}
