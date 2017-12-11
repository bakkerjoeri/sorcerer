export default class Entity {
	constructor(options = {}) {
		if (options.hasOwnProperty('sprite')) {
			this.setSprite(options.sprite);
		}

		if (options.hasOwnProperty('position')) {
			this.setPosition(options.position);
		}

		if (options.hasOwnProperty('solid')) {
			this.setSolidity(options.solid);
		}

		if (options.hasOwnProperty('size')) {
			this.setSize(options.size);
		}
	}

	step(time) {

	}

	setSprite(sprite) {
		this.sprite = sprite;
	}

	setPosition(position) {
		this.position = position;
	}

	getPosition() {
		return this.position;
	}

	setSolidity(solid) {
		this.solid = solid;
	}

	isSolid() {
		return this.solid;
	}

	setSize(size) {
		this.size = size;
	}

	getSize() {
		return this.size;
	}

	changePosition(change) {
		let currentPosition = this.getPosition();

		this.setPosition({
			x: currentPosition.x + change.x,
			y: currentPosition.y + change.y,
		});
	}
}
