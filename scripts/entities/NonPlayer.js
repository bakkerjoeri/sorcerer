import Actor from './Actor';
import SpriteAtlas from './../core/SpriteAtlas';
import PubSub from './../core/PubSub';

export default class NonPlayer extends Actor {
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
	}

	takeTurn() {
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
}
