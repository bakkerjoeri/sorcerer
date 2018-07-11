import createStateEntity from './../utility/createStateEntity';
import gameStateStore from './../model/gameStateStore';
import {addGameObject} from './../model/gameObjects';
import {addGameObjectToRoom} from './../model/rooms';

export function createGameObject(components = {}) {
	return createStateEntity('gameObject', {
		components,
	});
}

export function addGameObjectAndAddToCurrentRoom(gameObject) {
	gameStateStore.dispatch(addGameObject(gameObject));
	addGameObjectToRoom(gameStateStore.getState().game.currentRoomId, gameObject.id);
};
