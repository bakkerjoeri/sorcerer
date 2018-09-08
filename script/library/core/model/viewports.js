import gameStateStore from './gameStateStore';

export const addViewport = viewport => gameStateStore.dispatch(state => ({
	...state,
	viewports: {
		...state.viewports,
		[viewport.id]: viewport,
	},
}));

export const changeViewportPosition = (id, newPosition) => gameStateStore.dispatch(state => ({
	...state,
	viewports: {
		...state.viewports,
		[id]: {
			...state.viewports[id],
			position: newPosition,
		}
	}
}));

export const setViewportIsActive = (id, isActive) => gameStateStore.dispatch(state => ({
	...state,
	viewports: {
		...state.viewports,
		[id]: {
			...state.viewports[id],
			isActive,
		}
	}
}));

export const getViewports = () => {
	return Object.values(gameStateStore.getState().viewports);
};

export const getViewportWithId = (id) => {
	return gameStateStore.getState().viewports[id];
};

export const getActiveViewports = () => {
	return getViewports().filter(viewport => viewport.isActive);
}

export const getViewportsInRoomWithId = (roomId) => {
	return gameStateStore.getState().rooms[roomId].viewports.map(viewportId => getViewportWithId(viewportId));
};

export const getActiveViewportsInRoomWithId = (roomId) => {
	return getViewportsInRoomWithId(roomId).filter(viewport => viewport.isActive);
};
