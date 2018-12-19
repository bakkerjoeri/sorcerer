import {getCurrentRoom} from './../model/rooms.js';
import {getActiveViewportsInRoomWithId, changeViewportPosition} from './../model/viewports.js';
import {getSpriteWithId} from './../model/sprites.js';
import {getSpriteFrameWithId} from './../model/spriteFrames.js';
import {getGameObjectWithId} from './../model/gameObjects.js';

export default function updatePositioningOfViewports(state) {
	let currentRoom = getCurrentRoom(state);
	let viewportsToUpdate = getActiveViewportsInRoomWithId(state, currentRoom.id)
		.filter((viewport) => viewport.gameObjectIdToFollow !== null);

	return viewportsToUpdate.reduce((newState, viewport) => {
		return changeViewportPosition(
			viewport.id,
			calculateNewViewportPosition(state, viewport, currentRoom),
		)(state);
	}, state);
}

function calculateNewViewportPosition(state, viewport, room) {
	if (viewport.gameObjectIdToFollow !== null) {
		let gameObjectToFollow = getGameObjectWithId(state, viewport.gameObjectIdToFollow);

		if (gameObjectToFollow.components.sprite) {
			let spriteAsset = getSpriteWithId(state, gameObjectToFollow.components.sprite.assetId);
			let currentSpriteFrame = getSpriteFrameWithId(state, spriteAsset.spriteFrames[gameObjectToFollow.components.sprite.currentFrameIndex]);

			let newViewportPosition = {
				x: gameObjectToFollow.components.position.x - (viewport.size.width / 2) + (currentSpriteFrame.size.width / 2),
				y: gameObjectToFollow.components.position.y - (viewport.size.height / 2) + (currentSpriteFrame.size.height / 2),
			};

			if (newViewportPosition.x < 0) {
				newViewportPosition.x = 0;
			}

			if (newViewportPosition.y < 0) {
				newViewportPosition.y = 0;
			}

			if (newViewportPosition.x > (room.size.width - viewport.size.width)) {
				newViewportPosition.x = room.size.width - viewport.size.width;
			}

			if (newViewportPosition.y > (room.size.height - viewport.size.height)) {
				newViewportPosition.y = room.size.height - viewport.size.height;
			}

			return newViewportPosition;
		}
	}

	return viewport.position;
}
