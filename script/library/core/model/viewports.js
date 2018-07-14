import gameStateStore from './gameStateStore';
import createAction from './../../store/createAction';
import createSelector from './../../store/createSelector';

export const addViewport = viewport => createAction(gameStateStore, state => ({
	...state,
	viewports: {
		...state.viewports,
		[viewport.id]: viewport,
	},
}));

export const changeViewportPosition = (id, newPosition) => createAction(gameStateStore, state => ({
	...state,
	viewports: {
		...state.viewports,
		[id]: {
			...state.viewports[id],
			position: newPosition,
		}
	}
}));

export const setViewportIsActive = (id, isActive) => createAction(gameStateStore, state => ({
	...state,
	viewports: {
		...state.viewports,
		[id]: {
			...state.viewports[id],
			isActive,
		}
	}
}));

export const getViewports = () => createAction(gameStateStore, state => {
	return Object.values(state.viewports);
});

export const getViewportWithId = (id) => createAction(gameStateStore, state => {
	return state.viewports[id];
});

export const getActiveViewports = () => {
	return getViewports().filter(viewport => viewport.isActive);
}

export const getViewportsInRoomWithId = (roomId) => createAction(gameStateStore, state => {
	return state.rooms[roomId].viewports.map(viewportId => getViewportWithId(viewportId));
});

export const getActiveViewportsInRoomWithId = (roomId) => {
	return getViewportsInRoomWithId(roomId).filter(viewport => viewport.isActive);
};
