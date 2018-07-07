import createStateEntity from './../utility/createStateEntity';

export function createRoom(properties = {}) {
	const DEFAULT_PROPERTIES = {
		size: {
			width: 0,
			height: 0,
		},
		backgroundColor: '#000',
		viewports: [],
		entities: [],
	};

	return createStateEntity('room', properties, DEFAULT_PROPERTIES);
}
