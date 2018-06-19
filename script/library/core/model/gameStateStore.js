import createStore from './../../../library/store/createStore';
import reducer from './reducers';

const INITIAL_STATE = {
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

export default createStore(reducer, INITIAL_STATE);
