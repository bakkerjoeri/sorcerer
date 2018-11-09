import System from './../module/System.js';
import store from './../model/gameStateStore.js';
import {getCurrentRoom} from './../model/rooms.js';
import {getActiveViewportsInRoomWithId, changeViewportPosition} from './../model/viewports.js';
import {getSpriteWithId} from './../model/sprites.js';
import {getSpriteFrameWithId} from './../model/spriteFrames.js';
import {getGameObjectWithId} from './../model/gameObjects.js';

export default class ViewportPositionSystem extends System {
	constructor() {
		super();

		this.onEvent('draw', () => {
			let currentRoom = getCurrentRoom(store.getState());
			let viewportsToUpdate = getActiveViewportsInRoomWithId(store.getState(), currentRoom.id)
				.filter((viewport) => viewport.gameObjectIdToFollow !== null);

			viewportsToUpdate.forEach((viewport) => {
				store.dispatch(changeViewportPosition(
					viewport.id,
					calculateNewViewportPosition(viewport, currentRoom)
				));
			});
		});
	}
}

function calculateNewViewportPosition(viewport, room) {
	if (viewport.gameObjectIdToFollow !== null) {
		let gameObjectToFollow = getGameObjectWithId(store.getState(), viewport.gameObjectIdToFollow);

		if (gameObjectToFollow.components.sprite) {
			let spriteAsset = getSpriteWithId(store.getState(), gameObjectToFollow.components.sprite.assetId);
			let currentSpriteFrame = getSpriteFrameWithId(store.getState(), spriteAsset.spriteFrames[gameObjectToFollow.components.sprite.currentFrameIndex]);

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

			// @TODO: Remove dependency on `room`.
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
