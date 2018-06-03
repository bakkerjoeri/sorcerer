import combineReducers from './../../../../library/store/combineReducers';
import {SET_GAME_NAME, SET_CURRENT_ROOM_ID} from './../actions/game';
import {ADD_GAME_OBJECT, SET_SPRITE_ID_FOR_GAME_OBJECT, CHANGE_POSITION_OF_GAME_OBJECT} from './../actions/gameObjects';
import {ADD_VIEWPORT, CHANGE_VIEWPORT_POSITION, SET_VIEWPORT_IS_ACTIVE} from './../actions/viewports';
import {ADD_SPRITE, ADD_SPRITE_FRAME_TO_SPRITE, SET_CURRENT_FRAME_INDEX_FOR_SPRITE} from './../actions/sprites';
import {ADD_SPRITE_FRAME} from './../actions/spriteFrames';
import {ADD_SPRITE_SHEET} from './../actions/spriteSheets';
import {ADD_ROOM, ADD_VIEWPORT_TO_ROOM, ADD_GAME_OBJECT_TO_ROOM} from './../actions/rooms';

const initialState = {
	game: {
		name: '',
		currentRoomId: null,
	},
	gameObjects: {},
	rooms: {},
	sprites: {},
	spriteFrames: {},
	spriteSheets: {},
	viewports: {},
};

export default combineReducers(game, gameObjects, rooms, sprites, spriteFrames, spriteSheets, viewports);

export function game(state = initialState, action) {
	switch (action.type) {
		case SET_GAME_NAME:
			return Object.assign({}, state, {
				game: Object.assign({}, state.game, {
					name: action.name,
				}),
			});
		case SET_CURRENT_ROOM_ID:
			return Object.assign({}, state, {
				game: Object.assign({}, state.game, {
					currentRoomId: action.roomId,
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
		case SET_SPRITE_ID_FOR_GAME_OBJECT:
			return Object.assign({}, state, {
				gameObjects: Object.assign({}, state.gameObjects, {
					[action.id]: Object.assign({}, state.gameObjects[action.id], {
						spriteId: action.spriteId,
					}),
				}),
			});
		case CHANGE_POSITION_OF_GAME_OBJECT:
			return Object.assign({}, state, {
				gameObjects: Object.assign({}, state.gameObjects, {
					[action.id]: Object.assign({}, state.gameObjects[action.id], {
						position: action.newPosition,
					}),
				}),
			});
		default:
			return state;
	}
}

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
						position: action.newPosition,
					}),
				}),
			});
		default:
			return state;
	}
}

export function sprites(state = initialState, action) {
	switch (action.type) {
		case ADD_SPRITE:
			return Object.assign({}, state, {
				sprites: Object.assign({}, state.sprites, {
					[action.sprite.id]: action.sprite,
				}),
			});
		case ADD_SPRITE_FRAME_TO_SPRITE:
			return Object.assign({}, state, {
				sprites: Object.assign({}, state.sprites, {
					[action.id]: Object.assign({}, state.sprites[action.id], {
						spriteFrames: [...state.sprites[action.id].spriteFrames, action.spriteFrameId],
					}),
				}),
			});
		case SET_CURRENT_FRAME_INDEX_FOR_SPRITE:
			return Object.assign({}, state, {
				sprites: Object.assign({}, state.sprites, {
					[action.id]: Object.assign({}, state.sprites[action.id], {
						currentFrameIndex: action.currentFrameIndex,
					}),
				}),
			});
		default:
			return state;
	}
}

export function spriteFrames(state = initialState, action) {
	switch (action.type) {
		case ADD_SPRITE_FRAME:
			return Object.assign({}, state, {
				spriteFrames: Object.assign({}, state.spriteFrames, {
					[action.spriteFrame.id]: action.spriteFrame,
				}),
			});
		default:
			return state;
	}
}

export function spriteSheets(state = initialState, action) {
	switch (action.type) {
		case ADD_SPRITE_SHEET:
			return Object.assign({}, state, {
				spriteSheets: Object.assign({}, state.spriteSheets, {
					[action.spriteSheet.id]: action.spriteSheet,
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
