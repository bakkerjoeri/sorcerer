import createStateEntity from './../utility/createStateEntity.js';
import store from './../model/gameStateStore.js';
import {addSprite} from './../model/sprites.js';

export function createSprite(properties = {}) {
	const DEFAULT_PROPERTIES = {
		spriteFrames: [],
		offset: {
			x: 0,
			y: 0,
		},
	};

	let sprite = createStateEntity('sprite', {
		...DEFAULT_PROPERTIES,
		...properties,
	});

	store.dispatch(addSprite(sprite));

	return sprite;
}
