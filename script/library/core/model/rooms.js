import { getCurrentRoomId } from './game.js';
import { getViewportWithId } from './viewports.js';

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

export const getAllRooms = (state) => {
	return Object.values(state.rooms);
};

export const getRoomWithId = (state, id) => {
	return state.rooms[id];
};

export const getCurrentRoom = (state) => {
	return getRoomWithId(state, getCurrentRoomId(state));
};

export const getViewportsInRoomWithId = (state, roomId) => {
	return state.rooms[roomId].viewports.map(
		viewportId => getViewportWithId(state, viewportId)
	);
};

export const getActiveViewportsInRoomWithId = (state, roomId) => {
	return getViewportsInRoomWithId(state, roomId).filter(viewport => viewport.isActive);
};

export const getActiveViewportsInCurrentRoom = (state) => {
	return getActiveViewportsInRoomWithId(state, getCurrentRoomId(state));
}
