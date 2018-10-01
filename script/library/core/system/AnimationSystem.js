import System from './../module/System';
import store from './../model/gameStateStore';
import {getSpriteWithId} from './../model/sprites';
import {updateComponentOfGameObject} from './../model/gameObjects'
import {doesGameObjectHaveComponents} from './../module/GameObject';

export default class AnimationSystem extends System {
	constructor() {
		super(entity => doesGameObjectHaveComponents(entity, ['sprite']));

		this.timeOfPreviousFrameByGameObjectId = {};

		this.animateGameObject = this.animateGameObject.bind(this);

		this.observe('update', (gameObjects) => {
			gameObjects.forEach(this.animateGameObject);
		});
	}

	animateGameObject(gameObject) {
		let {sprite} = gameObject.components;
		let spriteAsset = getSpriteWithId(store.getState(), sprite.assetId);

		if (
			spriteAsset.spriteFrames.length > 1
			&& sprite.framesPerSecond !== 0
			&& !sprite.isAnimationPaused
			&& !(!sprite.isAnimationLooping && sprite.currentFrameIndex === (spriteAsset.spriteFrames.length - 1))
		) {
			if (!this.timeOfPreviousFrameByGameObjectId[gameObject.id]) {
				this.timeOfPreviousFrameByGameObjectId[gameObject.id] = this.game.elapsed;
			}

			let timeSincePreviousFrame = this.game.elapsed - this.timeOfPreviousFrameByGameObjectId[gameObject.id];

			let frameChange = timeSincePreviousFrame / (1000 / sprite.framesPerSecond);

			if (frameChange > 0) {
				frameChange = Math.floor(frameChange);
			}

			if (frameChange < 0) {
				frameChange = Math.ceil(frameChange);
			}

			if (frameChange !== 0) {
				this.timeOfPreviousFrameByGameObjectId[gameObject.id] = this.game.elapsed;
				let newFrameIndex = calculateNewFrameIndexWithChange(sprite.currentFrameIndex, frameChange, spriteAsset.spriteFrames.length, sprite.isAnimationLooping);
				store.dispatch(updateComponentOfGameObject(gameObject.id, 'sprite', {
					currentFrameIndex: newFrameIndex
				}));
			}
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
