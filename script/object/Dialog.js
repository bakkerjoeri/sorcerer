import GameObject from './../core/GameObject';

export default class Dialog extends GameObject {
	constructor (options) {
		super(options);
	}

	displayMessage(message) {
		this.message = message;
	}

	draw(time, canvas, viewport) {
		let context = canvas.getContext('2d');

		context.fillStyle = '#e4e4e4';
		context.fillRect(
			this.position.x,
			canvas.height - this.size.height - 10,
			this.size.width,
			this.size.height
		);

		context.strokeStyle = '#bad455';
		context.strokeRect(
			this.position.x,
			canvas.height - this.size.height - 10,
			this.size.width,
			this.size.height
		);

		if (this.message) {
			context.font = '9pt monospace';
			context.fillStyle = 'yellow';
			context.fillText(
				this.message,
				this.position.x,
				canvas.height - this.size.height - 10
			);
		}
	}
}
