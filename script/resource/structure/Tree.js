import SpriteAtlas from 'core/SpriteAtlas';

export const Tree = {
	type: 'grave',
	sprite: getSprite(),
	size: {
		width: 1,
		height: 1,
	},
	solid: true,
};

function getSprite() {
	let spriteAtlasDefinition = '{ "file": "assets/images/deadtree-sheet.png", "frames": [ { "name": "deadtree", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 32 } } ] }';
	let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
	let treeSprite = spriteAtlas.createSpriteWithFrames([
		'deadtree'
	]);
	treeSprite.setOrigin({x: 0, y: -16});

	return treeSprite;
}
