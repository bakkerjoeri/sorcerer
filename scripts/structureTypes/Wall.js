import SpriteAtlas from './../core/SpriteAtlas';

export const Wall = {
	type: 'grave',
	sprite: getSprite(),
	size: {
		width: 1,
		height: 1,
	},
	solid: true,
};

function getSprite() {
	let spriteAtlasDefinition = '{ "file": "assets/images/wall-sheet.png", "frames": [ { "name": "wall_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
	let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
	let wallSprite = spriteAtlas.createSpriteWithFrames([
		'wall_0'
	]);

	return wallSprite;
}
