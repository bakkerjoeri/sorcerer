export const ADD_GAME_OBJECT = 'ADD_GAME_OBJECT';
export function addGameObject(gameObject) {
	return {
		type: ADD_GAME_OBJECT,
		gameObject,
	};
}
