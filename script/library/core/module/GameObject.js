import createStateEntity from './../utility/createStateEntity';
import {addGameObject} from './../model/gameObjects';
import {addGameObjectToRoom} from './../model/rooms';
import {getCurrentRoomId} from './../model/game';

export function createGameObject(components = {}) {
	return createStateEntity('gameObject', {
		components,
	});
}

export function addGameObjectAndAddToCurrentRoom(gameObject) {
	addGameObject(gameObject);
	addGameObjectToRoom(getCurrentRoomId(), gameObject.id);
};
