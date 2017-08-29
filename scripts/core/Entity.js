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

		if (options.hasOwnProperty('boundaries')) {
			this.setBoundaries(options.boundaries);
		}

		this.context = options.context;
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

	setSolidity(isSolid) {
		this.solid = solid;
	}

	isSolid() {
		return this.solid;
	}

	setBoundaries(boundaries) {
		this.boundaries = boundaries;
	}

	getBoundaries() {
		return this.boundaries;
	}

	changePosition(change) {
		let currentPosition = this.getPosition();

		this.setPosition({
			x: currentPosition.x + change.x,
			y: currentPosition.y + change.y,
		});
	}
}
