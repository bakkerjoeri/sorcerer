import sprites from '../../assets/sprites.js';
import { createSpriteFramesFromSpriteSheet } from './../library/core/module/SpriteFrame.js';
import { createSprite } from './../library/core/module/Sprite.js';
import { addSprite } from './../library/core/model/sprites.js';
import { addSpriteFrame } from './../library/core/model/spriteFrames.js';

export default function loadSprites(state) {
	return sprites.reduce((newState, spriteData) => {
		let spriteFrames = createSpriteFramesFromSpriteSheet(
			spriteData.name,
			spriteData.filepath,
			spriteData.frameSize,
			spriteData.frameStart,
			spriteData.frameTotal
		);

		newState = spriteFrames.reduce((stateWithSpriteFrames, spriteFrame) => {
			return addSpriteFrame(spriteFrame)(stateWithSpriteFrames);
		}, newState);

		return addSprite(createSprite({
			id: spriteData.name,
			offset: spriteData.offset,
			spriteFrames: spriteFrames.map((spriteFrame) => spriteFrame.id),
		}))(newState);
	}, state);
}
