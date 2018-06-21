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

export const addGameObjectToRoom = (id, gameObjectId) => state => ({
	...state,
	rooms: {
		...state.rooms,
		[id]: {
			...state.rooms[id],
			gameObjects: [
				...state.rooms[id].gameObjects,
				gameObjectId,
			],
		},
	},
});
