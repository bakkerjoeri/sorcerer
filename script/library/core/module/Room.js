import createEntity from './../utility/createEntity';
import gameStateStore from './../model/gameStateStore';
import {getActiveViewportsInRoomWithId} from './../model/viewports';
import {getGameObjectsInRoomWithId, getVisibleGameObjectsInRoomWithId} from './../model/gameObjects';
import {updateViewportInRoom, clearViewportFromContext} from './Viewport';
import {updateGameObject, drawGameObjectInViewportOntoContext} from './GameObject';

export function createRoom(properties = {}) {
	const DEFAULT_PROPERTIES = {
		size: {
			width: 0,
			height: 0,
		},
		backgroundColor: '#000',
		viewports: [],
		gameObjects: [],
	};

	return createEntity('room', properties, DEFAULT_PROPERTIES);
}

export function updateRoom(time, room) {
	// Update all the game objects in this room.
	getGameObjectsInRoomWithId(gameStateStore.getState(), room.id).forEach((gameObject) => {
		updateGameObject(time, gameObject);
	});

	// Update all this room's viewports.
	getActiveViewportsInRoomWithId(gameStateStore.getState(), room.id).forEach((viewport) => {
		updateViewportInRoom(time, viewport, room);
	});
}

export function drawRoomOntoContext(room, context) {
	// Draw the room through all its active viewports.
	getActiveViewportsInRoomWithId(gameStateStore.getState(), room.id).forEach((viewport) => {
		drawRoomWithinViewport(room, viewport, context);
	});
}

export function drawRoomWithinViewport(room, viewport, context) {
	// Clear this viewport.
	clearViewportFromContext(viewport, context);

	// Draw the room background.
	drawRoomBackgroundOntoContext(room, viewport.origin, viewport.size, context);

	// Draw all of this room's visible game objects.
	let visibleGameObjects = getVisibleGameObjectsInRoomWithId(gameStateStore.getState(), room.id)
	visibleGameObjects.forEach((visibleGameObject) => {
		drawGameObjectInViewportOntoContext(visibleGameObject, viewport, context)
	});
}

function drawRoomBackgroundOntoContext(room, origin, size, context) {
	context.fillStyle = room.backgroundColor;
	context.fillRect(
		origin.x,
		origin.y,
		size.width,
		size.height,
	);

	context.strokeStyle = '#bad455';
	context.strokeRect(
		origin.x,
		origin.y,
		size.width,
		size.height,
	);
}
