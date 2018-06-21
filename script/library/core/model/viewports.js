export const addViewport = viewport => state => ({
	...state,
	viewports: {
		...state.viewports,
		[viewport.id]: viewport,
	},
});

export const changeViewportPosition = (id, newPosition) => state => ({
	...state,
	viewports: {
		...state.viewports,
		[id]: {
			...state.viewports[id],
			position: newPosition,
		}
	}
});

export const setViewportIsActive = (id, isActive) => state => ({
	...state,
	viewports: {
		...state.viewports,
		[id]: {
			...state.viewports[id],
			isActive,
		}
	}
});

export const getViewports = (state) => {
	return Object.values(state.viewports);
}

export const getViewportWithId = (state, id) => {
	return state.viewports[id];
}

export const getActiveViewports = (state) => {
	return getViewports(state).filter(viewport => viewport.isActive);
}

export const getViewportsInRoomWithId = (state, roomId) => {
	return state.rooms[roomId].viewports.map(viewportId => getViewportWithId(state, viewportId));
}

export const getActiveViewportsInRoomWithId = (state, roomId) => {
	return getViewportsInRoomWithId(state, roomId).filter(viewport => viewport.isActive);
}
