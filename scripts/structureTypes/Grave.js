import SpriteAtlas from './../core/SpriteAtlas';

export const Grave = {
	type: 'grave',
	sprite: getSprite(),
	size: {
		width: 1,
		height: 1,
	},
	solid: true,
};

function getSprite() {
	let spriteAtlasDefinition = '{ "file": "assets/images/grave-sheet.png", "frames": [ { "name": "grave_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
	let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
	let graveSprite = spriteAtlas.createSpriteWithFrames([
		'grave_0',
	]);

	return graveSprite;
}
