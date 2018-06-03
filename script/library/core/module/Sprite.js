import createEntity from './../utility/createEntity';
import gameStateStore from './../model/gameStateStore';
import {getSpriteFrameWithId} from './../model/selectors/spriteFrames';
import {setCurrentFrameIndexForSprite} from './../model/actions/sprites';
import {drawSpriteFrameAtPosition} from './SpriteFrame';

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
		framesPerSecond: 0,
		isAnimationPaused: false,
		isAnimationLooping: true,
	};

	return createEntity('sprite', properties, DEFAULT_PROPERTIES);
}

const timeOfPreviousFrameBySpriteId = {};

export function updateSprite(time, sprite) {
	if (
		sprite.spriteFrames.length > 1
		&& sprite.framesPerSecond !== 0
		&& !sprite.isAnimationPaused
		&& !(!sprite.isAnimationLooping && sprite.currentFrameIndex === (sprite.spriteFrames.length - 1))
	) {
		if (!timeOfPreviousFrameBySpriteId[sprite.id]) {
			timeOfPreviousFrameBySpriteId[sprite.id] = 0;
		}

		let timeSincePreviousFrame = time - timeOfPreviousFrameBySpriteId[sprite.id];

		let frameChange = timeSincePreviousFrame / (1000 / sprite.framesPerSecond);

		if (frameChange > 0) {
			frameChange = Math.floor(frameChange);
		}

		if (frameChange < 0) {
			frameChange = Math.ceil(frameChange);
		}

		if (frameChange !== 0) {
			timeOfPreviousFrameBySpriteId[sprite.id] = time;
			let newFrameIndex = calculateNewFrameIndexWithChange(sprite.currentFrameIndex, frameChange, sprite.spriteFrames.length, sprite.isAnimationLooping);
			gameStateStore.dispatch(setCurrentFrameIndexForSprite(sprite.id, newFrameIndex));
		}
	}
}

export function drawSpriteAtPosition(sprite, position, context) {
	let currentFrameId = sprite.spriteFrames[sprite.currentFrameIndex];

	if (currentFrameId) {
		let currentFrame = getSpriteFrameWithId(gameStateStore.getState(), currentFrameId);

		drawSpriteFrameAtPosition(currentFrame, position, context);
	}
}

function calculateNewFrameIndexWithChange(currentFrameIndex, change, amountOfFrames, looping = true) {
	change = Math.round(change);

	if (change === 0) {
		return currentFrameIndex;
	}

	if (looping) {
		let newFrameIndex = (currentFrameIndex + change) % amountOfFrames

		if (newFrameIndex < 0) {
			return newFrameIndex + amountOfFrames;
		}

		return newFrameIndex;
	}

	if (!looping) {
		let newFrameIndex = currentFrameIndex + change;

		if (newFrameIndex > (amountOfFrames - 1)) {
			return (amountOfFrames - 1);
		}

		if (newFrameIndex < 0) {
			return 0;
		}

		return newFrameIndex;
	}
}
