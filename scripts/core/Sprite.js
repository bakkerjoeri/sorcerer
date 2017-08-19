export default class Sprite {
	constructor(image, width, height) {
		this.image = image;
		this.width = width;
		this.height = height;
	}

	draw(context, x, y) {
		if (!this.hasLoaded) {
			this.image.onload = () => {
				this.hasLoaded = true;
				this.draw(context, x, y);
			}
		} else {
			context.drawImage(
				this.image,
				0, 0,
				this.image.width, this.image.height,
				x, y,
				this.width, this.height,
			);
		}
	}
}
