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

export const getAllViewports = (state) => {
	return Object.values(state.viewports);
};

export const getViewportWithId = (state, id) => {
	return state.viewports[id];
};

export const getActiveViewports = (state) => {
	return getAllViewports(state).filter(viewport => viewport.isActive);
}
