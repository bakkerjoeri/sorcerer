import createStateEntity from './../utility/createStateEntity';
import gameStateStore from './../model/gameStateStore';
import {addSpriteFrame} from './../model/spriteFrames';

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

	return createStateEntity('spriteFrame', properties, DEFAULT_PROPERTIES);
}

/**
 * Load a spritesheet into state.
 *
 * @param  {String} filePath                Path of to sprite sheet's image file
 * @param  {Object} frameSize               The size of each frame
 * @param  {Number} [frameStart=0]
 * @param  {Number} [frameOffset=1]
 * @param  {Number} [framesPerRow=Infinity] How many frames each row of the sprite sheets contains.
 *                                          This is used to determine when to wrap down to the next frame.
 */
export function loadSpriteFrames(name, filePath, frameSize, frameStart = 0, frameOffset = 1, framesPerRow = Infinity) {
	// Create a new sprite sheet
	let currentFrameRow = 0;

	for (
		let currentFrameIndex = frameStart;
		currentFrameIndex < frameStart + frameOffset;
		currentFrameIndex = currentFrameIndex + 1
	) {
		let spriteFrame = createSpriteFrame({
			id: `${name}_${currentFrameIndex}`,
			imageFilePath: filePath,
			origin: {
				x: currentFrameIndex * frameSize.width,
				y: currentFrameRow * frameSize.height,
			},
			size: frameSize,
		});

		gameStateStore.dispatch(addSpriteFrame(spriteFrame));
	}
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
