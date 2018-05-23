import getUniqueId from './../utility/getUniqueId';

export function createGameObject(properties = {}) {
	const DEFAULT_PROPERTIES = {
		spriteName: '',
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

	let gameObject = Object.assign({}, DEFAULT_PROPERTIES, properties);

	if (!gameObject.hasOwnProperty('id')) {
		gameObject.id = getUniqueId('gameObjects');
	}

	return gameObject;
}
