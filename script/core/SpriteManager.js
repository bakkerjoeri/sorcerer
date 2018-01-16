import Sprite from 'core/Sprite';
import FileManager from 'core/FileManager';

const SPRITE = 'SPRITE';

const assets = new Map();
let library;

export default class SpriteManager {
	static async loadLibrary(libraryUrl) {
		library = this.library = await FileManager.loadFile(libraryUrl, 'json');
	}

	static get(name, type) {
		if (!assets.has(name)) {
			if (type === SPRITE) {
				assets.set(name, getSprite(name));
			}
		}

		return assets.get(name);
	}
}

function getSprite(name) {
	let spriteDefinition = library.find((sprite) => {
		return sprite.name === name;
	});

	if (!spriteDefinition) {
		throw new Error(`No sprite found for "${name}"`);
	}

	let sprite = Sprite.createFromDefinition(spriteDefinition);

	return sprite;
}
