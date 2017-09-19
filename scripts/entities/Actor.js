import Entity from './../core/Entity';

export default class Actor extends Entity {
	constructor (options) {
		super(options);
	}

	moveUp() {
		if (this.canMoveToPosition({
			x: this.position.x,
			y: this.position.y - 16
		})) {
			this.changePosition({
				x: 0,
				y: -16
			});

			return true;
		}

		return false;
	}

	moveRight() {
		if (this.canMoveToPosition({
			x: this.position.x + 16,
			y: this.position.y
		})) {
			this.changePosition({
				x: 16,
				y: 0
			});

			return true;
		}

		return false;
	}

	moveDown() {
		if (this.canMoveToPosition({
			x: this.position.x,
			y: this.position.y + 16
		})) {
			this.changePosition({
				x: 0,
				y: 16
			});

			return true;
		}

		return false;
	}

	moveLeft() {
		if (this.canMoveToPosition({
			x: this.position.x - 16,
			y: this.position.y
		})) {
			this.changePosition({
				x: -16,
				y: 0
			});

			return true;
		}

		return false;
	}

	canMoveToPosition(position) {
		return !(this.room.hasSolidEntityInBoundaries({
			x: position.x,
			y: position.y,
			width: this.sprite.size.width,
			height: this.sprite.size.height,
		}));
	}
}
