import System from './../module/System';
import gameStateStore from './../model/gameStateStore';
import {getSpriteWithId} from './../model/sprites';
import {updateComponentOfEntity} from './../model/entities'

export default class AnimationSystem extends System {
	constructor() {
		super(['sprite'], animateEntity);
	}
}

const timeOfPreviousFrameBySpriteId = {};

function animateEntity(entity, game) {
	let {sprite} = entity.components;
	let spriteAsset = getSpriteWithId(gameStateStore.getState(), sprite.assetId);

	if (
		spriteAsset.spriteFrames.length > 1
		&& sprite.framesPerSecond !== 0
		&& !sprite.isAnimationPaused
		&& !(!sprite.isAnimationLooping && sprite.currentFrameIndex === (spriteAsset.spriteFrames.length - 1))
	) {
		if (!timeOfPreviousFrameBySpriteId[sprite.id]) {
			timeOfPreviousFrameBySpriteId[sprite.id] = game.elapsed;
		}

		let timeSincePreviousFrame = game.elapsed - timeOfPreviousFrameBySpriteId[sprite.id];

		let frameChange = timeSincePreviousFrame / (1000 / spriteAsset.framesPerSecond);

		if (frameChange > 0) {
			frameChange = Math.floor(frameChange);
		}

		if (frameChange < 0) {
			frameChange = Math.ceil(frameChange);
		}

		if (frameChange !== 0) {
			timeOfPreviousFrameBySpriteId[sprite.id] = game.elapsed;
			let newFrameIndex = calculateNewFrameIndexWithChange(sprite.currentFrameIndex, frameChange, spriteAsset.spriteFrames.length, sprite.isAnimationLooping);

			gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'sprite', {
				currentFrameIndex: newFrameIndex
			}));
		}
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
