import combineReducers from './../combineReducers';
import {
	ADD_VIEWPORT,
	CHANGE_VIEWPORT_POSITION,
	SET_VIEWPORT_IS_ACTIVE
} from './../actions/viewports';
import {
	ADD_GAME_OBJECT,
} from './../actions/gameObjects';

const initialState = {
	viewports: {},
	gameObjects: {},
};

export default combineReducers(viewports, gameObjects);

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

export function gameObjects(state = initialState, action) {
	switch (action.type) {
		case ADD_GAME_OBJECT:
			return Object.assign({}, state, {
				gameObjects: Object.assign({}, state.gameObjects, {
					[action.gameObject.id]: action.gameObject,
				}),
			});
		default:
			return state;
	}
}
