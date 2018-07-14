import createStateEntity from './../utility/createStateEntity';

export function createSprite(properties = {}) {
	const DEFAULT_PROPERTIES = {
		spriteFrames: [],
	};

	return createStateEntity('sprite', properties, DEFAULT_PROPERTIES);
}
