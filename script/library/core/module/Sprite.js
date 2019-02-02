import createStateEntity from './../utility/createStateEntity.js';

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

	return sprite;
}
