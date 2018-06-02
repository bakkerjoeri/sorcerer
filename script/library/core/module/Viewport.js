import createEntity from './../utility/createEntity';
import {changeViewportPosition} from './../model/actions/viewports';
import gameStateStore from './../model/gameStateStore';
import {drawRoomBackgroundOntoContext} from './Room';

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

	return createEntity('viewport', properties, DEFAULT_PROPERTIES);
}

export function updateViewportInRoom(time, viewport, room) {
	let newPosition = calculateViewportPositionForGameObjectToFollow(viewport, room, viewport.gameObjectToFollow);

	// Only dispatch an update to the viewport position if the calculated
	// new position is different from the current position.
	if (newPosition.x !== viewport.position.x || newPosition.y !== viewport.position.y) {
		gameStateStore.dispatch(changeViewportPosition(viewport.id, newPosition));
	}
}

function calculateViewportPositionForGameObjectToFollow(viewport, room, gameObject) {
	if (gameObject && gameObject.sprite && gameObject.sprite.size) {
		let newViewportPosition = {
			x: gameObject.position.x - (viewport.size.width / 2) + (gameObject.sprite.size.width / 2),
			y: gameObject.position.y - (viewport.size.height / 2) + (gameObject.sprite.size.height / 2),
		};

		if (newViewportPosition.x < 0) {
			newViewportPosition.x = 0;
		}

		if (newViewportPosition.y < 0) {
			newViewportPosition.y = 0;
		}

		// @TODO: Remove dependency on `room`.
		if (newViewportPosition.x > (room.size.width - viewport.size.width)) {
			newViewportPosition.x = room.size.width - viewport.size.width;
		}

		if (newViewportPosition.y > (room.size.height - viewport.size.height)) {
			newViewportPosition.y = room.size.height - viewport.size.height;
		}

		return newViewportPosition;
	}

	return viewport.position;
}

export function clearViewportFromContext(viewport, context) {
	context.clearRect(
		viewport.origin.x,
		viewport.origin.y,
		viewport.size.width,
		viewport.size.height
	);
}

function drawMiddleOfViewportOntoContext(viewport, context) {
	context.strokeStyle = '#bad455';

	context.beginPath();
	context.moveTo(viewport.origin.x, viewport.origin.y);
	context.lineTo(viewport.origin.x + viewport.size.width, viewport.origin.y + viewport.size.height);
	context.stroke();

	context.beginPath();
	context.moveTo(viewport.origin.x + viewport.size.width, viewport.origin.y);
	context.lineTo(viewport.origin.x, viewport.origin.y + viewport.size.height);
	context.stroke();
}
