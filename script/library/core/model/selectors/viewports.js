export function getViewports(state) {
	return Object.values(state.viewports);
}

export function getViewportWithId(state, id) {
	return state.viewports[id];
}

export function getActiveViewports(state) {
	return getViewports(state).filter(viewport => viewport.isActive);
}

export function getViewportsInRoomWithId(state, roomId) {
	return state.rooms[roomId].viewports.map(viewportId => getViewportWithId(state, viewportId));
}

export function getActiveViewportsInRoomWithId(state, roomId) {
	return getViewportsInRoomWithId(state, roomId).filter(viewport => viewport.isActive);
}
