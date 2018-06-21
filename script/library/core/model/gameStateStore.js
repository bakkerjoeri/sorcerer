import createStore from './../../../library/store/createStore';

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

export default createStore(INITIAL_STATE);
