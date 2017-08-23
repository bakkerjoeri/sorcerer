import SpriteFrame from './../core/SpriteFrame';

export default class Sprite {
	constructor(frames, options = {}) {
		this.setFrames(frames);

		if (options.hasOwnProperty('size')) {
			this.size = options.size;
		} else {
			this.size = calculateMaximumSizeFromFrames(this.getFrames());
		}

		if (options.hasOwnProperty('origin')) {
			this.origin = options.origin;
		}

		if (options.hasOwnProperty('frameIndex')) {
			this.setCurrentFrameIndex(options.frameIndex);
		} else {
			this.setCurrentFrameIndex(0);
		}

		if (options.hasOwnProperty('framesPerSecond')) {
			this.setFramesPerSecond(options.framesPerSecond);
		} else {
			this.setFramesPerSecond(1);
		}

		this.timeOfPreviousFrame = 0;
	}

	setFrames(frames = []) {
		if (Array.isArray(frames)) {
			this.frames = frames;
		} else if (frames instanceof SpriteFrame) {
			this.frames = [frames];
		} else {
			this.frames = [];
		}
	}

	getFrames() {
		return this.frames;
	}

	setFramesPerSecond(framesPerSecond) {
		this.framesPerSecond = framesPerSecond;
	}

	getFramesPerSecond() {
		return this.framesPerSecond;
	}

	setCurrentFrameIndex(newCurrentFrameIndex) {
		if (this.frames[newCurrentFrameIndex]) {
			this.currentFrameIndex = newCurrentFrameIndex;
		}
	}

	getCurrentFrame() {
		return this.frames[this.currentFrameIndex];
	}

	draw(context, x, y) {
		let currentFrame = this.getCurrentFrame();

		if (currentFrame) {
			context.drawImage(
				currentFrame.getImage(),
				currentFrame.getOrigin().x, currentFrame.getOrigin().y,
				currentFrame.getSize().width, currentFrame.getSize().height,
				x, y,
				this.size.width, this.size.height,
			);
		}
	}

	step(time) {
		let framesPerSecond = this.getFramesPerSecond();

		if (framesPerSecond !== 0) {
			let timeSincePreviousFrame = time - this.timeOfPreviousFrame;

			let frameChange = timeSincePreviousFrame / (1000 / framesPerSecond);

			if (frameChange > 0) {
				frameChange = Math.floor(frameChange);
			}

			if (frameChange < 0) {
				frameChange = Math.ceil(frameChange);
			}

			if (frameChange !== 0) {
				this.timeOfPreviousFrame = time;
				this.setCurrentFrameIndex(calculateNewFrameIndexWithChange(this.currentFrameIndex, frameChange, this.frames.length));
			}
		}
	}

	nextFrame() {
		this.currentFrameIndex = calculateNewFrameIndexWithChange(this.currentFrameIndex, 1, this.frames.length);
	}

	previousFrame() {
		this.currentFrameIndex = calculateNewFrameIndexWithChange(this.currentFrameIndex, -1, this.frames.length);
	}
}

function calculateNewFrameIndexWithChange(currentFrameIndex, change, amountOfFrames) {
	change = Math.round(change);

	if (change === 0) {
		return currentFrameIndex;
	}

	let newFrameIndex = (currentFrameIndex + change) % amountOfFrames

	if (newFrameIndex < 0) {
		return newFrameIndex + amountOfFrames;
	}

	return newFrameIndex;
}

function calculateMaximumSizeFromFrames(frames) {
	return {
		width: 16,
		height: 16,
	}
}
