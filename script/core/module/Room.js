import createEntity from './../utility/createEntity';

export function createRoom(properties = {}) {
	const DEFAULT_PROPERTIES = {
		size: {
			width: 0,
			height: 0,
		},
		backgroundColor: '#000',
		viewports: [],
	};

	return createEntity('room', properties, DEFAULT_PROPERTIES);
}
