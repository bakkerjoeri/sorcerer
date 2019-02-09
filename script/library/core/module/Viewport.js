import createStateEntity from './../utility/createStateEntity.js';

export function createViewport(properties = {}) {
	const DEFAULT_PROPERTIES = {
		position: {
			x: 0,
			y: 0,
		},
		origin: {
			x: 0,
			y: 0,
		},
		size: {
			width: 0,
			height: 0,
		},
		isActive: true,
		gameObjectIdToFollow: null,
	};

	let viewport = createStateEntity('viewport', {
		...DEFAULT_PROPERTIES,
		...properties,
	});

	return viewport;
}
