import SpriteAtlas from './../core/SpriteAtlas';

export const KingSlime = {
	type: 'king slime',
	stats: {
		maxHealth: 28,
		strength: 2,
	},
	sprite: getSprite(),
	size: {
		width: 2,
		height: 2,
	},
	solid: true,
};

function getSprite() {
	let spriteAtlasDefinition = '{ "file": "assets/images/king-slime-sheet.png", "frames": [ { "name": "slime_idle_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 32, "height": 32 } }, { "name": "slime_idle_1", "origin": { "x": 32, "y": 0 }, "size": { "width": 32, "height": 32 } } ] }';
	let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
	let slimeSprite = spriteAtlas.createSpriteWithFrames([
		'slime_idle_0',
		'slime_idle_1',
	]);

	slimeSprite.setFramesPerSecond(1);

	return slimeSprite;
}
