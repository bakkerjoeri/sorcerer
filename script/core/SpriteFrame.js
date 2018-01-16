export default class SpriteFrame {
	constructor(name, image, origin, size) {
		this.setName(name);
		this.setImage(image);
		this.setOrigin(origin);
		this.setSize(size);
	}

	setName(name) {
		this.name = name;
	}

	setImage(image) {
		this.imageLoaded = false;
		this.image = image;

		this.image.addEventListener('load', () => {
			this.imageLoaded = true;
		});
	}

	setOrigin(origin) {
		this.origin = origin;
	}

	setSize(size) {
		this.size = size;
	}

	getName() {
		return this.name;
	}

	getImage() {
		return this.image;
	}

	getOrigin() {
		return this.origin;
	}

	getSize() {
		return this.size;
	}

	onImageLoaded(callback) {
		if (this.imageLoaded) {
			callback();
		} else {
			this.image.addEventListener('load', callback);
		}
	}
}
