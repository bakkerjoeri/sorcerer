import SpriteAtlas from 'core/SpriteAtlas';
import FileManager from 'core/FileManager';

const SPRITE = 'SPRITE';

const assets = new Map();
let spriteIndex;

export default class AssetManager {
	static async loadSpriteIndex(url) {
		spriteIndex = await FileManager.loadFile(url, 'json')
	}

	static getAsset(name, type) {
		if (!assets.has(name)) {
			if (type === SPRITE) {
				assets.set(name, getSprite(name));
			}
		}

		return assets.get(name);
	}
}

function getSprite(name) {
	let spriteDefinition = spriteIndex.find((sprite) => {
		return sprite.name === name;
	});

	if (!spriteDefinition) {
		throw new Error(`No sprite found for "${name}"`);
	}

	let spriteAtlas = new SpriteAtlas(spriteDefinition);
	let sprite;

	if (name === 'greenknight') {
		sprite = spriteAtlas.createSpriteWithFrames([
			'greenknight_idle_0',
			'greenknight_idle_0',
			'greenknight_idle_0',
			'greenknight_idle_0',
			'greenknight_idle_0',
			'greenknight_idle_1',
			'greenknight_idle_2',
			'greenknight_idle_3',
			'greenknight_idle_3',
			'greenknight_idle_3',
			'greenknight_idle_3',
			'greenknight_idle_4',
			'greenknight_idle_5',
		]);

		sprite.looping = true;
		sprite.setFramesPerSecond(10);
	}

	if (name === 'knight') {
		sprite = spriteAtlas.createSpriteWithFrames([
			'knight_idle_0',
			'knight_idle_0',
			'knight_idle_0',
			'knight_idle_0',
			'knight_idle_0',
			'knight_idle_1',
			'knight_idle_2',
			'knight_idle_3',
			'knight_idle_3',
			'knight_idle_3',
			'knight_idle_3',
			'knight_idle_4',
			'knight_idle_5',
		]);

		sprite.looping = true;
		sprite.setFramesPerSecond(10);
	}

	if (name === 'kingslime') {
		sprite = spriteAtlas.createSpriteWithFrames([
			'kingslime_idle_0',
			'kingslime_idle_1',
		]);

		sprite.looping = true;
		sprite.setFramesPerSecond(1);
	}

	if (name === 'slime') {
		sprite = spriteAtlas.createSpriteWithFrames([
			'slime_idle_0',
			'slime_idle_1',
		]);

		sprite.looping = true;
		sprite.setFramesPerSecond(2);
	}

	if (name === 'grave') {
		sprite = spriteAtlas.createSpriteWithFrames([
			'grave_0',
		]);
	}

	if (name === 'tree') {
		sprite = spriteAtlas.createSpriteWithFrames([
			'tree_0',
		]);
	}

	if (name === 'wall') {
		sprite = spriteAtlas.createSpriteWithFrames([
			'wall_0',
		]);
	}

	return sprite;
}
