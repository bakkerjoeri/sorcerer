import createStateEntity from './../utility/createStateEntity';
import gameStateStore from './../model/gameStateStore';
import {getSpriteFrameWithId} from './../model/spriteFrames';
import {setCurrentFrameIndexForSprite} from './../model/sprites';
import {drawSpriteFrameAtPosition} from './SpriteFrame';

export function createSprite(properties = {}) {
	const DEFAULT_PROPERTIES = {
		spriteFrames: [],
	};

	return createStateEntity('sprite', properties, DEFAULT_PROPERTIES);
}
