import SpriteAtlas from './../core/SpriteAtlas';

export const Slime = {
	type: 'slime',
	stats: {
		maxHealth: 16,
		strength: 1,
	},
	sprite: getSprite(),
	size: {
		width: 1,
		height: 1,
	},
	solid: true,
};

function getSprite() {
	let spriteAtlasDefinition = '{ "file": "assets/images/slime-sheet.png", "frames": [ { "name": "slime_idle_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "slime_idle_1", "origin": { "x": 16, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
	let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
	let slimeSprite = spriteAtlas.createSpriteWithFrames([
		'slime_idle_0',
		'slime_idle_1',
	]);

	slimeSprite.setFramesPerSecond(2);

	return slimeSprite;
}
