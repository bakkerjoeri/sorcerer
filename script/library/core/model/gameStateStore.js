import createStore from './../../../library/store/createStore';

const INITIAL_STATE = {
	game: {
		name: '',
		currentRoomId: null,
	},
	rooms: {},
	sprites: {},
	spriteFrames: {},
	viewports: {},
	gameObjects: {},
};

export default createStore(INITIAL_STATE);
