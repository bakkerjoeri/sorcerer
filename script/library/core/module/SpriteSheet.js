import createEntity from './../utility/createEntity';

export function createSpriteSheet(properties = {}) {
	const DEFAULT_PROPERTIES = {
		filePath: '',
	};

	return createEntity('spriteSheet', properties, DEFAULT_PROPERTIES);
}
