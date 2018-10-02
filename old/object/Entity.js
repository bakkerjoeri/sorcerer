import GameObject from './../core/GameObject.js';

export default class GameObject extends GameObject {
	constructor(options) {
		super(options);
	}

	setPositionInLevel(positionInLevel) {
		this.positionInLevel = positionInLevel;
	}

	setSizeInLevel(sizeInLevel) {
		this.sizeInLevel = sizeInLevel;
	}

	step(time) {
		super.step(time);

		this.position = {
			x: this.positionInLevel.x * 16,
			y: this.positionInLevel.y * 16,
		};

		this.size = {
			width: this.sizeInLevel.width * 16,
			height: this.sizeInLevel.height * 16,
		};
	}
}
