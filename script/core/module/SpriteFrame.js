import createEntity from './../utility/createEntity';

export function createSpriteFrame(properties = {}) {
	const DEFAULT_PROPERTIES = {
		spriteSheet: null,
		origin: {
			x: 0,
			y: 0,
		},
		size: {
			width: 0,
			height: 0,
		},
	};

	return createEntity('spriteFrame', properties, DEFAULT_PROPERTIES);
}
