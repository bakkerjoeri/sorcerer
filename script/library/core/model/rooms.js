import gameStateStore from './gameStateStore';
import createAction from './../../store/createAction';
import createSelector from './../../store/createSelector';

export const addRoom = room => createAction(gameStateStore, state => ({
	...state,
	rooms: {
		...state.rooms,
		[room.id]: room,
	},
}));

export const addViewportToRoom = (id, viewportId) => createAction(gameStateStore, state => ({
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

export const addGameObjectToRoom = (id, gameObjectId) => createAction(gameStateStore, state => ({
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

export const getRooms = () => createSelector(gameStateStore, state => {
	return Object.values(state.rooms);
});

export const getRoomWithId = (id) => createSelector(gameStateStore, state => {
	return state.rooms[id];
});

export const getCurrentRoom = () => createSelector(gameStateStore, state => {
	return getRoomWithId(state.game.currentRoomId);
});
