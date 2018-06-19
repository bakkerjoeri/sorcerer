export const ADD_GAME_OBJECT = 'ADD_GAME_OBJECT';
export function addGameObject(gameObject) {
	return {
		type: ADD_GAME_OBJECT,
		gameObject,
	};
}

export const SET_SPRITE_ID_FOR_GAME_OBJECT = 'SET_SPRITE_ID_FOR_GAME_OBJECT';
export function setSpriteIdForGameObject(id, spriteId) {
	return {
		type: SET_SPRITE_ID_FOR_GAME_OBJECT,
		id,
		spriteId,
	};
}

export const CHANGE_POSITION_OF_GAME_OBJECT = 'CHANGE_POSITION_OF_GAME_OBJECT';
export function changePositionOfGameObject(id, newPosition) {
	return {
		type: CHANGE_POSITION_OF_GAME_OBJECT,
		id,
		newPosition,
	}
}
