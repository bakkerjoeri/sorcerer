import sprites from '../../assets/sprites.js';
import {loadSpriteFrames} from './../library/core/module/SpriteFrame.js';
import {createSprite} from './../library/core/module/Sprite.js';

export default function loadSprites() {
	sprites.forEach((spriteData) => {
		loadSpriteFrames(spriteData.name, spriteData.filepath, spriteData.frameSize, spriteData.frameStart, spriteData.frameOffset);
		createSprite({
			id: spriteData.name,
			spriteFrames: spriteData.frames.map((frameId) => `${spriteData.name}_${frameId}`),
		});
	});
}
