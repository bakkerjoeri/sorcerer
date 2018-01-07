const assets = new Map();
import SpriteAtlas from 'core/SpriteAtlas';

const SPRITE = 'SPRITE';

export default class AssetManager {
	static getAsset(name, type) {
		if (!assets.has(name)) {
			if (name === 'greenKnightIdle' && type === SPRITE) {
				assets.set(name, getSpriteGreenKnightIdle());
			}

			if (name === 'kingSlimeIdle' && type === SPRITE) {
				assets.set(name, getSpriteKingSlimeIdle());
			}
		}

		return assets.get(name);
	}
}

function getSpriteGreenKnightIdle() {
	let spriteAtlasDefinition = '{ "file": "assets/images/character-sheet-green.png", "frames": [ { "name": "player_idle_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_1", "origin": { "x": 16, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_2", "origin": { "x": 32, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_3", "origin": { "x": 48, "y": 0 }, "size": { "width": 16, "height": 16 } }, {"name": "player_idle_4", "origin": { "x": 64, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_5", "origin": { "x": 80, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
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

	return knightSprite;
}

function getSpriteKingSlimeIdle() {
	let spriteAtlasDefinition = '{ "file": "assets/images/king-slime-sheet.png", "frames": [ { "name": "slime_idle_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 32, "height": 32 } }, { "name": "slime_idle_1", "origin": { "x": 32, "y": 0 }, "size": { "width": 32, "height": 32 } } ] }';
	let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
	let slimeSprite = spriteAtlas.createSpriteWithFrames([
		'slime_idle_0',
		'slime_idle_1',
	]);

	slimeSprite.setFramesPerSecond(1);

	return slimeSprite;
}
