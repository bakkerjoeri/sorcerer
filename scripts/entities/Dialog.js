import Entity from './../core/Entity';

export default class Dialog extends Entity {
	constructor (options) {
		super(options);
	}

	draw(time, context, viewport) {
		context.fillStyle = '#e4e4e4';
		context.fillRect(
			this.position.x,
			this.position.y,
			this.size.width,
			this.size.height,
		);

		context.strokeStyle = '#bad455';
		context.strokeRect(
			this.position.x,
			this.position.y,
			this.size.width,
			this.size.height,
		);
	}
}
