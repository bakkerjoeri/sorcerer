export const ADD_VIEWPORT = 'ADD_VIEWPORT';
export function addViewport(viewport) {
	return {
		type: ADD_VIEWPORT,
		viewport,
	};
}

export const CHANGE_VIEWPORT_POSITION = 'CHANGE_VIEWPORT_POSITION';
export function changeViewportPosition(id, position) {
	if (!position.hasOwnProperty('x') || !position.hasOwnProperty('y')) {
		throw new Error('Position should be an object with properties \'x\' and \'y\'.');
	}

	return {
		type: CHANGE_VIEWPORT_POSITION,
		id,
		position,
	};
}

export const SET_VIEWPORT_IS_ACTIVE = 'SET_VIEWPORT_IS_ACTIVE';
export function setViewportIsActive(id, isActive) {
	return {
		type: SET_VIEWPORT_IS_ACTIVE,
		id,
		isActive,
	};
}
