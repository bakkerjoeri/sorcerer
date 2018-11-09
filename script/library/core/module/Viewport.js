import createStateEntity from './../utility/createStateEntity.js';
import store from './../model/gameStateStore.js';
import {addViewport} from './../model/viewports.js';

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

	store.dispatch(addViewport(viewport));

	return viewport;
}
