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
