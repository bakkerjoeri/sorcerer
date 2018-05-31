import createEntity from './../utility/createEntity';

export function createSprite(properties = {}) {
	const DEFAULT_PROPERTIES = {
		origin: {
			x: 0,
			y: 0,
		},
		size: {
			width: 0,
			height: 0,
		},
		spriteFrames: [],
		currentFrameIndex: 0,
		framesPerSecond: 1,
		isAnimationPaused: false,
		isAnimationLooping: true,
	};

	return createEntity('sprite', properties, DEFAULT_PROPERTIES);
}
