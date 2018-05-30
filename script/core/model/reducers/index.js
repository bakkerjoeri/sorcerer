import combineReducers from './../../../library/store/combineReducers';
import {
	ADD_VIEWPORT,
	CHANGE_VIEWPORT_POSITION,
	SET_VIEWPORT_IS_ACTIVE,
} from './../actions/viewports';
import {
	ADD_GAME_OBJECT,
} from './../actions/gameObjects';
import {
	ADD_ROOM,
	ADD_VIEWPORT_TO_ROOM,
	ADD_GAME_OBJECT_TO_ROOM,
} from './../actions/rooms';

const initialState = {
	gameObjects: {},
	rooms: {},
	viewports: {},
};

export default combineReducers(viewports, gameObjects, rooms);

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

export function rooms(state = initialState, action) {
	switch (action.type) {
		case ADD_ROOM:
			return Object.assign({}, state, {
				rooms: Object.assign({}, state.rooms, {
					[action.room.id]: action.room,
				}),
			});
		case ADD_VIEWPORT_TO_ROOM:
			return Object.assign({}, state, {
				rooms: Object.assign({}, state.rooms, {
					[action.id]: Object.assign({}, state.rooms[action.id], {
						viewports: [...state.rooms[action.id].viewports, action.viewportId],
					}),
				}),
			});
		case ADD_GAME_OBJECT_TO_ROOM:
			return Object.assign({}, state, {
				rooms: Object.assign({}, state.rooms, {
					[action.id]: Object.assign({}, state.rooms[action.id], {
						gameObjects: [...state.rooms[action.id].gameObjects, action.gameObjectId],
					}),
				}),
			});
		default:
			return state;
	}
}
