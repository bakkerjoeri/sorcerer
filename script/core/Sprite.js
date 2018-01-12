import SpriteFrame from 'core/SpriteFrame';

const DEFAULT_OPTIONS = {
	origin: {
		x: 0,
		y: 0,
	},
	frameIndex: 0,
	framesPerSecond: 1,
	looping: true,
};

export default class Sprite {
	constructor(frames, options = {}) {
		this.setFrames(frames);

		options = Object.assign({}, DEFAULT_OPTIONS, options);

		if (options.hasOwnProperty('size')) {
			this.size = options.size;
		} else {
			this.size = calculateMaximumSizeFromFrames(this.getFrames());
		}

		this.setOrigin(options.origin);
		this.setCurrentFrameIndex(options.frameIndex);
		this.setFramesPerSecond(options.framesPerSecond);
		this.looping = options.looping;

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

	step(time) {
		let framesPerSecond = this.getFramesPerSecond();

		if (framesPerSecond !== 0 && !(!this.looping && this.currentFrameIndex === (this.frames.length - 1))) {
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
				this.setCurrentFrameIndex(calculateNewFrameIndexWithChange(this.currentFrameIndex, frameChange, this.frames.length, this.looping));
			}
		}
	}

	draw(time, canvas, position) {
		let context = canvas.getContext('2d');
		let currentFrame = this.getCurrentFrame();

		if (currentFrame) {
			context.drawImage(
				currentFrame.getImage(),
				currentFrame.getOrigin().x, currentFrame.getOrigin().y,
				currentFrame.getSize().width, currentFrame.getSize().height,
				position.x, position.y,
				this.size.width, this.size.height
			);
		}
	}

	nextFrame() {
		this.currentFrameIndex = calculateNewFrameIndexWithChange(this.currentFrameIndex, 1, this.frames.length, this.looping);
	}

	previousFrame() {
		this.currentFrameIndex = calculateNewFrameIndexWithChange(this.currentFrameIndex, -1, this.frames.length, this.looping);
	}

	setOrigin(origin) {
		this.origin = origin;
	}

	getOrigin() {
		return this.origin;
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

function calculateMaximumSizeFromFrames(frames) {
	let biggestWidth = 0;
	let biggestHeight = 0;

	frames.forEach((frame) => {
		if (frame.size.width > biggestWidth) {
			biggestWidth = frame.size.width;
		}

		if (frame.size.height > biggestHeight) {
			biggestHeight = frame.size.height;
		}
	});

	return {
		width: biggestWidth,
		height: biggestHeight,
	}
}
