export function getRooms(state) {
	return Object.values(state.rooms);
}

export function getRoomWithId(state, id) {
	return state.rooms[id];
}
