export default class Entity {
	constructor(options = {}) {
		if (options.hasOwnProperty('sprite')) {
			this.setSprite(options.sprite);
		}

		if (options.hasOwnProperty('roomPosition')) {
			this.setRoomPosition(options.roomPosition);
		}

		if (options.hasOwnProperty('solid')) {
			this.setSolidity(options.solid);
		}

		if (options.hasOwnProperty('size')) {
			this.setSize(options.size);
		}

		if (options.hasOwnProperty('origin')) {
			this.setOrigin(options.origin);
		} else {
			this.setOrigin({x: 0, y: 0});
		}
	}

	step(time) {

	}

	setSprite(sprite) {
		this.sprite = sprite;
	}

	setRoomPosition(roomPosition) {
		this.roomPosition = roomPosition;
	}

	getRoomPosition() {
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

	setOrigin(origin) {
		this.origin = origin;
	}

	getOrigin() {
		return this.origin;
	}

	changeRoomPosition(change) {
		let currentRoomPosition = this.getRoomPosition();

		this.setRoomPosition({
			x: currentRoomPosition.x + change.x,
			y: currentRoomPosition.y + change.y,
		});
	}

	isWithinBoundaries(boundaries) {
		return (
			this.roomPosition.y < boundaries.y + boundaries.height
			&& this.roomPosition.x + this.size.width > boundaries.x
			&& this.roomPosition.y + this.size.height > boundaries.y
			&& this.roomPosition.x < boundaries.x + boundaries.width
		);
	}
}
