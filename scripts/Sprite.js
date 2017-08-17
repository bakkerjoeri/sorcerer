export default class Sprite {
	constructor(image, width, height) {
		this.image = image;
		this.width = width;
		this.height = height;
	}

	draw(context, x, y) {
		this.image.onload = () => {
			context.drawImage(
				this.image,
				0, 0,
				this.image.width, this.image.height,
				x, y,
				this.width, this.height,
			);
		};
	}
}
