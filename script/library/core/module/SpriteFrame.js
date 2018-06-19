import createEntity from './../utility/createEntity';
import gameStateStore from './../model/gameStateStore';
import {getSpriteSheetWithId} from './../model/selectors/spriteSheets';
import {getImageFromSpriteSheet} from './SpriteSheet';

export function createSpriteFrame(properties = {}) {
	const DEFAULT_PROPERTIES = {
		spriteSheet: null,
		origin: {
			x: 0,
			y: 0,
		},
		size: {
			width: 0,
			height: 0,
		},
	};

	return createEntity('spriteFrame', properties, DEFAULT_PROPERTIES);
}

export function drawSpriteFrameAtPosition(spriteFrame, position, context) {
	if (spriteFrame.spriteSheet !== null) {
		let spriteSheet = getSpriteSheetWithId(gameStateStore.getState(), spriteFrame.spriteSheet);

		context.drawImage(
			getImageFromSpriteSheet(spriteSheet),
			spriteFrame.origin.x, spriteFrame.origin.y,
			spriteFrame.size.width, spriteFrame.size.height,
			position.x, position.y,
			spriteFrame.size.width, spriteFrame.size.height
		);
	}
}
