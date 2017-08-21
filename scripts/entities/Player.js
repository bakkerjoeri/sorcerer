import Entity from './../core/Entity';
import Sprite from './../core/Sprite';

export default class Player extends Entity {
	constructor(options) {
		let playerImage = new Image();
		playerImage.src = '../assets/character.png';

		super({
			sprite: new Sprite(playerImage, 16, 16),
			position: options.position,
		});

		window.addEventListener('keydown', this.onKeyDown.bind(this));
	}

	onKeyDown(event) {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			this.moveUp();
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			this.moveRight();
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			this.moveDown();
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			this.moveLeft();
		}
	}

	moveUp() {
		this.changePosition({
			x: 0,
			y: -16
		});
	}

	moveRight() {
		this.changePosition({
			x: 16,
			y: 0
		});
	}

	moveDown() {
		this.changePosition({
			x: 0,
			y: 16
		});
	}

	moveLeft() {
		this.changePosition({
			x: -16,
			y: 0
		});
	}
}
