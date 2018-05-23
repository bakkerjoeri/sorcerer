import getUniqueId from './../utility/getUniqueId';
import {changeViewportPosition} from './../actions/viewports';

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

	let viewport = Object.assign({}, DEFAULT_PROPERTIES, properties);

	if (!viewport.hasOwnProperty('id')) {
		viewport.id = getUniqueId('viewports');
	}

	return viewport;
}

export function updateViewportInRoom(time, viewport, room) {
	let newPosition = calculateViewportPositionForGameObjectToFollow(viewport, room, viewport.gameObjectToFollow);
	window.store.dispatch(changeViewportPosition(viewport.id, newPosition));
}

export function drawViewportForRoomOntoContext(time, viewport, room, context) {
	// Clear viewport
	clearViewportFromContext(viewport, context);

	// draw room background
	drawRoomBackgroundOntoContext(room, viewport.origin, viewport.size, context);

	// draw all visible game objects
	room.gameObjects
	.filter((gameObject) => gameObject.visible)
	.forEach((visibleGameObject) => {
		drawGameObjectInViewportOntoContext(time, visibleGameObject, viewport, context)
	});
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

function clearViewportFromContext(viewport, context) {
	context.clearRect(
		viewport.origin.x,
		viewport.origin.y,
		viewport.size.width,
		viewport.size.height
	);
}

function drawRoomBackgroundOntoContext(room, origin, size, context) {
	room.drawBackground(context, origin, size);
}

function drawGameObjectInViewportOntoContext(time, gameObject, viewport, context) {
	gameObject.draw(time, context, viewport);
}

function drawMiddleOfViewportOntoContext(context, viewport) {
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
