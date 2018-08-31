import System from './../module/System';
import {getCurrentRoomId} from './../model/game';
import {getActiveViewportsInRoomWithId} from './../model/viewports';
import {getSpriteWithId} from './../model/sprites';
import {updateComponentOfGameObject} from './../model/gameObjects';

export default class ViewportPositionSystem extends System {
	constructor() {
		super();

		this.observe('update', () => {
			getActiveViewportsInRoomWithId(getCurrentRoomId).filter((viewport) =>
				viewport.gameObjectIdToFollow !== null
			);
		});
	}
}

function calculateNewViewportPosition(viewport, room) {
	if (viewport.gameObjectIdToFollow !== null) {
		let gameObjectToFollow = getGameObjectWithId(viewport.gameObjectIdToFollow);

		if (gameObjectToFollow.currentSprite !== null) {
			let spriteOfGameObjectToFollow = getSpriteWithId(gameObjectToFollow.spriteId);

			let newViewportPosition = {
				x: gameObjectToFollow.position.x - (viewport.size.width / 2) + (spriteOfGameObjectToFollow.size.width / 2),
				y: gameObjectToFollow.position.y - (viewport.size.height / 2) + (spriteOfGameObjectToFollow.size.height / 2),
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
