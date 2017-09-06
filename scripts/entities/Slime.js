import Entity from './../core/Entity';
import SpriteAtlas from './../core/SpriteAtlas';
import PubSub from './../core/PubSub';

export default class Slime extends Entity {
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
		this.setBoundaries({width: 16, height: 16});

		this.setSolidity(true);

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
		if (this.canMoveToPosition({
			x: this.position.x,
			y: this.position.y - 16
		})) {
			this.changePosition({
				x: 0,
				y: -16
			});
		}
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
		}
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
		}
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
		}
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
