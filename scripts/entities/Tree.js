import Entity from './../core/Entity';
import SpriteAtlas from './../core/SpriteAtlas';

export default class Tree extends Entity {
	constructor(options) {
		super(options);

		let spriteAtlasDefinition = '{ "file": "assets/images/deadtree-sheet.png", "frames": [ { "name": "deadtree", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 32 } } ] }';
		let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
		let wallSprite = spriteAtlas.createSpriteWithFrames([
			'deadtree'
		]);

		this.setSprite(wallSprite);
		this.setSize({width: 16, height: 16});
		this.setOrigin({x: 0, y: -16});

		this.setSolidity(true);
		this.type = 'wall';
	}

	canBeAttacked() {
		return false;
	}
}
