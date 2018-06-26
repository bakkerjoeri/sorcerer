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
	entities: {},
};

export default createStore(INITIAL_STATE);
