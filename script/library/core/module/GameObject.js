import createEntity from './../utility/createEntity';

export function createGameObject(properties = {}) {
	const DEFAULT_PROPERTIES = {
		sprite: null,
		position: {
			x: 0,
			y: 0,
		},
		positioning: 'absolute',
		size: {
			width: 0,
			height: 0,
		},
		solid: true,
		visible: true,
	};

	return createEntity('gameObject', properties, DEFAULT_PROPERTIES);
}
