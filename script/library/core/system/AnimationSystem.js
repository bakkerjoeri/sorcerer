import System from './../module/System';
import {getSpriteWithId} from './../model/sprites';
import {updateComponentOfGameObject} from './../model/gameObjects'

export default class AnimationSystem extends System {
	constructor() {
		super(['sprite']);

		this.observe('update', (gameObjects, game) => {
			gameObjects.forEach(gameObject => {
				animateGameObject(gameObject, game);
			});
		});
	}
}

const timeOfPreviousFrameByGameObjectId = {};

function animateGameObject(gameObject, game) {
	let {sprite} = gameObject.components;
	let spriteAsset = getSpriteWithId(sprite.assetId);

	if (
		spriteAsset.spriteFrames.length > 1
		&& sprite.framesPerSecond !== 0
		&& !sprite.isAnimationPaused
		&& !(!sprite.isAnimationLooping && sprite.currentFrameIndex === (spriteAsset.spriteFrames.length - 1))
	) {
		if (!timeOfPreviousFrameByGameObjectId[gameObject.id]) {
			timeOfPreviousFrameByGameObjectId[gameObject.id] = game.elapsed;
		}

		let timeSincePreviousFrame = game.elapsed - timeOfPreviousFrameByGameObjectId[gameObject.id];

		let frameChange = timeSincePreviousFrame / (1000 / sprite.framesPerSecond);

		if (frameChange > 0) {
			frameChange = Math.floor(frameChange);
		}

		if (frameChange < 0) {
			frameChange = Math.ceil(frameChange);
		}

		if (frameChange !== 0) {
			timeOfPreviousFrameByGameObjectId[gameObject.id] = game.elapsed;
			let newFrameIndex = calculateNewFrameIndexWithChange(sprite.currentFrameIndex, frameChange, spriteAsset.spriteFrames.length, sprite.isAnimationLooping);
			updateComponentOfGameObject(gameObject.id, 'sprite', {
				currentFrameIndex: newFrameIndex
			});
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
