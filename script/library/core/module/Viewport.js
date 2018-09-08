import createStateEntity from './../utility/createStateEntity';
import {addViewport, changeViewportPosition} from './../model/viewports';
import {getGameObjectWithId} from './../model/gameObjects';
import {getSpriteWithId} from './../model/sprites';

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

	addViewport(viewport);

	return viewport;
}

export function updateViewportPositionInRoom(viewportId, roomId) {
	let newPosition = calculateNewViewportPosition(viewport, room);

	// Only dispatch an update to the viewport position if the calculated
	// new position is different from the current position.
	if (newPosition.x !== viewport.position.x || newPosition.y !== viewport.position.y) {
		changeViewportPosition(viewport.id, newPosition);
	}
}
