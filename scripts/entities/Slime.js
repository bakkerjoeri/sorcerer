import Entity from './../core/Entity';
import SpriteAtlas from './../core/SpriteAtlas';
import PubSub from './../core/PubSub';

export default class Player extends Entity {
	constructor(options) {
		super(options);

		let spriteAtlasDefinition = '{ "file": "assets/images/slime-sheet.png", "frames": [ { "name": "slime_idle_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "slime_idle_1", "origin": { "x": 16, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
		let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
		let slimeSprite = spriteAtlas.createSpriteWithFrames([
			'slime_idle_0',
			'slime_idle_1',
		]);

		slimeSprite.setFramesPerSecond(2);
		this.setSprite(slimeSprite);

		PubSub.subscribe('turnTaken', this.takeTurn.bind(this));
	}

	takeTurn(data) {
		let decision = Math.round(Math.random() * 11);

		if (decision === 0) {
			this.moveUp();
		}

		if (decision === 1) {
			this.moveRight();
		}

		if (decision === 2) {
			this.moveDown();
		}

		if (decision === 3) {
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
