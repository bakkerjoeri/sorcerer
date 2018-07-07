export const addRoom = room => state => ({
	...state,
	rooms: {
		...state.rooms,
		[room.id]: room,
	},
});

export const addViewportToRoom = (id, viewportId) => state => ({
	...state,
	rooms: {
		...state.rooms,
		[id]: {
			...state.rooms[id],
			viewports: [
				...state.rooms[id].viewports,
				viewportId,
			],
		},
	},
});

export const addEntityToRoom = (id, entityId) => state => ({
	...state,
	rooms: {
		...state.rooms,
		[id]: {
			...state.rooms[id],
			entities: [
				...state.rooms[id].entities,
				entityId,
			],
		},
	},
});

export const getRooms = state => {
	return Object.values(state.rooms);
}

export const getRoomWithId = (state, id) => {
	return state.rooms[id];
}

export const getCurrentRoom = state => {
	return getRoomWithId(state, state.game.currentRoomId);
}
