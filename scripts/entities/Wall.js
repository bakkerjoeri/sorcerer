import Entity from './../core/Entity';
import SpriteAtlas from './../core/SpriteAtlas';

export default class Wall extends Entity {
	constructor(options) {
		super(options);

		let spriteAtlasDefinition = '{ "file": "assets/images/wall-sheet.png", "frames": [ { "name": "wall_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
		let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
		let wallSprite = spriteAtlas.createSpriteWithFrames([
			'wall_0'
		]);

		this.setSprite(wallSprite);
		this.setSize({width: 1, height: 1});

		this.setSolidity(true);
		this.type = 'wall';
	}

	canBeAttacked() {
		return false;
	}

	updateMapPosition(mapPosition) {
		this.mapPosition = mapPosition;
		this.position = {
			x: mapPosition.x * 16,
			y: mapPosition.y * 16,
		};
	}
}
