import Sprite from 'core/Sprite';
import SpriteFrame from 'core/SpriteFrame';

export default class SpriteAtlas {
	constructor(definition) {
		this.frames = createFramesFromDefinition(definition);
	}

	getFrame(frameName) {
		return this.frames.find((frame) => {
			return frame.getName() === frameName;
		});
	}

	createSpriteWithFrames(frameNames) {
		let frames = frameNames.map((frameName) => {
			return this.getFrame(frameName);
		})

		return new Sprite(frames);
	}
}

function createFramesFromDefinition(definition) {
	let frames = [];

	if (definition.hasOwnProperty('file')) {
		let image = new Image();
		image.src = definition.file;

		definition.frames.forEach((frameData) => {
			let frame = new SpriteFrame(
				frameData.name,
				image,
				frameData.origin,
				frameData.size,
			);

			frames.push(frame);
		});
	}

	return frames;
}
