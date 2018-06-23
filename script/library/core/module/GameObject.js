import createStateEntity from './../utility/createStateEntity';
import gameStateStore from './../model/gameStateStore';
import {getSpriteWithId} from './../model/sprites';
import {updateSprite, drawSpriteAtPosition} from './Sprite';

export function createGameObject(properties = {}) {
	const DEFAULT_PROPERTIES = {
		spriteId: null,
		position: {
			x: 0,
			y: 0,
		},
		positioning: 'absolute',
		size: {
			width: 0,
			height: 0,
		},
		isSolid: true,
		isVisible: true,
	};

	return createStateEntity('gameObject', properties, DEFAULT_PROPERTIES);
}

export function updateGameObject(time, gameObject) {
	// update the sprite
	if (gameObject.spriteId !== null) {
		let sprite = getSpriteWithId(gameStateStore.getState(), gameObject.spriteId);

		updateSprite(time, sprite);
	}
}

export function drawGameObjectInViewportOntoContext(gameObject, viewport, context) {
	if (gameObject.spriteId !== null) {
		let sprite = getSpriteWithId(gameStateStore.getState(), gameObject.spriteId);

		drawSpriteAtPosition(sprite, {
			x: gameObject.position.x + sprite.origin.x - (viewport.position.x - viewport.origin.x), // should be viewport relative
			y: gameObject.position.y + sprite.origin.y - (viewport.position.y - viewport.origin.y), // should be viewport relative
		}, context);
	}
}
