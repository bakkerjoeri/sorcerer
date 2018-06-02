import createEntity from './../utility/createEntity';

export function createSpriteSheet(properties = {}) {
	const DEFAULT_PROPERTIES = {
		filePath: '',
	};

	return createEntity('spriteSheet', properties, DEFAULT_PROPERTIES);
}

const imageOfSpriteSheetById = {};

export function getImageFromSpriteSheet(spriteSheet) {
	if (!imageOfSpriteSheetById[spriteSheet.id]) {
		let image = new Image();
		image.src = spriteSheet.filePath;
		imageOfSpriteSheetById[spriteSheet.id] = image;
	}

	return imageOfSpriteSheetById[spriteSheet.id];
}
