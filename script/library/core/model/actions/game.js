export const SET_GAME_NAME = 'SET_GAME_NAME';
export function setGameName(name) {
	return {
		type: SET_GAME_NAME,
		name,
	};
}

export const SET_CURRENT_ROOM_ID = 'SET_CURRENT_ROOM_ID';
export function setCurrentRoomId(roomId) {
	return {
		type: SET_CURRENT_ROOM_ID,
		roomId,
	};
}
