import createStateEntity from './../utility/createStateEntity.js';

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

	return room;
}
