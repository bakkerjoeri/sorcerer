import SpriteAtlas from './../core/SpriteAtlas';

export const Knight = {
	type: 'knight',
	stats: {
		maxHealth: 10,
		strength: 3,
	},
	sprite: getSprite(),
	size: {
		width: 1,
		height: 1,
	},
	solid: true,
};

function getSprite() {
	let spriteAtlasDefinition = '{ "file": "assets/images/character-sheet.png", "frames": [ { "name": "player_idle_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_1", "origin": { "x": 16, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_2", "origin": { "x": 32, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_3", "origin": { "x": 48, "y": 0 }, "size": { "width": 16, "height": 16 } }, {"name": "player_idle_4", "origin": { "x": 64, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_5", "origin": { "x": 80, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
	let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
	let knightSprite = spriteAtlas.createSpriteWithFrames([
		'player_idle_0',
		'player_idle_0',
		'player_idle_0',
		'player_idle_0',
		'player_idle_0',
		'player_idle_1',
		'player_idle_2',
		'player_idle_3',
		'player_idle_3',
		'player_idle_3',
		'player_idle_3',
		'player_idle_4',
		'player_idle_5',
	]);

	knightSprite.looping = true;
	knightSprite.setFramesPerSecond(10);

	return knightSprite
}
