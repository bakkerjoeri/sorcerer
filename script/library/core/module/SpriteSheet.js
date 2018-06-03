import createEntity from './../utility/createEntity';
import gameStateStore from './../model/gameStateStore';
import {addSpriteSheet} from './../model/actions/spriteSheets';
import {addSpriteFrame} from './../model/actions/spriteFrames';
import {createSpriteFrame} from './../module/SpriteFrame';

export function createSpriteSheet(properties = {}) {
	const DEFAULT_PROPERTIES = {
		filePath: '',
	};

	return createEntity('spriteSheet', properties, DEFAULT_PROPERTIES);
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
export function loadSpriteSheet(filePath, frameSize, frameStart = 0, frameOffset = 1, framesPerRow = Infinity) {
	// Create a new sprite sheet
	let spriteSheet = createSpriteSheet({
		filePath: filePath,
	});

	gameStateStore.dispatch(addSpriteSheet(spriteSheet));

	let currentFrameRow = 0;

	for (
		let currentFrameIndex = frameStart;
		currentFrameIndex < frameStart + frameOffset;
		currentFrameIndex = currentFrameIndex + 1
	) {
		let spriteFrame = createSpriteFrame({
			spriteSheet: spriteSheet.id,
			origin: {
				x: currentFrameIndex * frameSize.width,
				y: currentFrameRow * frameSize.height,
			},
			size: frameSize,
		});

		gameStateStore.dispatch(addSpriteFrame(spriteFrame));
	}
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
