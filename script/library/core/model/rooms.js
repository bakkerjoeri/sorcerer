import gameStateStore from './gameStateStore';
import {getCurrentRoomId} from './game';

export const addRoom = room => gameStateStore.dispatch(state => ({
	...state,
	rooms: {
		...state.rooms,
		[room.id]: room,
	},
}));

export const addViewportToRoom = (id, viewportId) => gameStateStore.dispatch(state => ({
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
}));

export const addGameObjectToRoom = (id, gameObjectId) => gameStateStore.dispatch(state => ({
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
}));

export const getRooms = () => {
	return Object.values(gameStateStore.getState().rooms);
};

export const getRoomWithId = (id) => {
	return gameStateStore.getState().rooms[id];
};

export const getCurrentRoom = () => {
	return getRoomWithId(getCurrentRoomId());
};
