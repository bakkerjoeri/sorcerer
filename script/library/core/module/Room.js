import createStateEntity from './../utility/createStateEntity';
import store from './../model/gameStateStore';
import {addRoom} from './../model/rooms';

export function createRoom(properties = {}) {
	const DEFAULT_PROPERTIES = {
		size: {
			width: 0,
			height: 0,
		},
		backgroundColor: '#000',
		viewports: [],
		gameObjects: [],
	};

	let room = createStateEntity('room', {
		...DEFAULT_PROPERTIES,
		...properties,
	});

	store.dispatch(addRoom(room));

	return room;
}
