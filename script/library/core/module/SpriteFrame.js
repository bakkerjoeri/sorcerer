import createStateEntity from './../utility/createStateEntity.js';

export function createSpriteFrame(properties = {}) {
	const DEFAULT_PROPERTIES = {
		imageFilePath: '',
		origin: {
			x: 0,
			y: 0,
		},
		size: {
			width: 0,
			height: 0,
		},
	};

	let spriteFrame = createStateEntity('spriteFrame', {
		...DEFAULT_PROPERTIES,
		...properties,
	});

	return spriteFrame;
}

/**
 * Load a spritesheet into state.
 *
 * @param  {String} filePath                Path of to sprite sheet's image file
 * @param  {Object} frameSize               The size of each frame
 * @param  {Number} [frameStart=0]
 * @param  {Number} [frameTotal=1]
 * @param  {Number} [framesPerRow=Infinity] How many frames each row of the sprite sheets contains.
 *                                          This is used to determine when to wrap down to the next frame.
 */
export function createSpriteFramesFromSpriteSheet(name, filePath, frameSize, frameStart = 0, frameTotal = 1, framesPerRow = Infinity) {
	let spriteFrames = [];

	// Create a new sprite sheet
	let currentFrameRow = 0;

	for (
		let currentFrameIndex = frameStart;
		currentFrameIndex < frameStart + frameTotal;
		currentFrameIndex = currentFrameIndex + 1
	) {
		spriteFrames = [
			...spriteFrames,
			createSpriteFrame({
				id: `${name}_${currentFrameIndex}`,
				imageFilePath: filePath,
				origin: {
					x: currentFrameIndex * frameSize.width,
					y: currentFrameRow * frameSize.height,
				},
				size: frameSize,
			}),
		];
	}

	return spriteFrames;
}

const imageCache = {};

export function getImageFromFilePath(filePath, cached = true) {
	if (!imageCache[filePath] || !cached) {
		let image = new Image();
		image.src = filePath;
		imageCache[filePath] = image;
	}

	return imageCache[filePath];
}
