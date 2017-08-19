export default class Entity {
	constructor(options = {}) {
		this.setSprite(options.sprite);
		this.setPosition(options.position);
		this.context = options.context;
	}

	setSprite(sprite) {
		this.sprite = sprite;
	}

	getPosition() {
		return this.position;
	}

	setPosition(position) {
		this.position = position;
	}

	changePosition(change) {
		let currentPosition = this.getPosition();

		this.setPosition({
			x: currentPosition.x + change.x,
			y: currentPosition.y + change.y,
		});
	}
}
