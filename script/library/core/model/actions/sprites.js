export const ADD_SPRITE = 'ADD_SPRITE';
export function addSprite(sprite) {
	return {
		type: ADD_SPRITE,
		sprite,
	};
}

export const ADD_SPRITE_FRAME_TO_SPRITE = 'ADD_SPRITE_FRAME_TO_SPRITE';
export function addSpriteFrameToSprite(id, spriteFrameId) {
	return {
		type: ADD_SPRITE_FRAME_TO_SPRITE,
		id,
		spriteFrameId,
	};
}

export const SET_CURRENT_FRAME_INDEX_FOR_SPRITE = 'SET_CURRENT_FRAME_INDEX_FOR_SPRITE';
export function setCurrentFrameIndexForSprite(id, currentFrameIndex) {
	return {
		type: SET_CURRENT_FRAME_INDEX_FOR_SPRITE,
		id,
		currentFrameIndex,
	};
}
