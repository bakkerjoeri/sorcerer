export const ADD_GAME_OBJECT = 'ADD_GAME_OBJECT';
export function addGameObject(gameObject) {
	return {
		type: ADD_GAME_OBJECT,
		gameObject,
	};
}

export const SET_SPRITE_FOR_GAME_OBJECT = 'SET_SPRITE_FOR_GAME_OBJECT';
export function setSpriteForGameObject(id, spriteId) {
	return {
		type: SET_SPRITE_FOR_GAME_OBJECT,
		id,
		spriteId,
	};
}
