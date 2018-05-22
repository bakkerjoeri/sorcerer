import {ADD_VIEWPORT, CHANGE_VIEWPORT_POSITION, SET_VIEWPORT_IS_ACTIVE} from './../actions/viewports';

const initialState = {
	viewports: {},
};

export function viewports(state = initialState, action) {
	switch (action.type) {
		case ADD_VIEWPORT:
			return Object.assign({}, state, {
				viewports: Object.assign({}, state.viewports, {
					[action.viewport.id]: action.viewport,
				}),
			});
		case SET_VIEWPORT_IS_ACTIVE:
			return Object.assign({}, state, {
				viewports: Object.assign({}, state.viewports, {
					[action.id]: Object.assign({}, state.viewports[action.id], {
						isActive: action.isActive,
					}),
				}),
			});
		case CHANGE_VIEWPORT_POSITION:
			return Object.assign({}, state, {
				viewports: Object.assign({}, state.viewports, {
					[action.id]: Object.assign({}, state.viewports[action.id], {
						position: action.position,
					}),
				}),
			});
		default:
			return state;
	}
}
