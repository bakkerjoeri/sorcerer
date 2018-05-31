export const ADD_ROOM = 'ADD_ROOM';
export function addRoom(room) {
	return {
		type: ADD_ROOM,
		room,
	};
}

export const ADD_VIEWPORT_TO_ROOM = 'ADD_VIEWPORT_TO_ROOM';
export function addViewportToRoom(id, viewportId) {
	return {
		type: ADD_VIEWPORT_TO_ROOM,
		id,
		viewportId,
	};
}

export const ADD_GAME_OBJECT_TO_ROOM = 'ADD_GAME_OBJECT_TO_ROOM';
export function addGameObjectToRoom(id, gameObjectId) {
	return {
		type: ADD_GAME_OBJECT_TO_ROOM,
		id,
		gameObjectId,
	};
}
