export default class Entity {
	constructor(options = {}) {
		this.sprite = options.sprite;
		this.position = options.position;
	}

	draw(context) {
		this.sprite.draw(context, this.position.x, this.position.y);
	}
}
