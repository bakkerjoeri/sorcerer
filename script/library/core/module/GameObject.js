import createStateEntity, {StateEntity} from './../utility/createStateEntity';
import {addGameObject} from './../model/gameObjects';
import {addGameObjectToRoom} from './../model/rooms';
import {getCurrentRoomId} from './../model/game';

export function createGameObject(components = {}) {
	let stateEntity = createStateEntity('gameObject', {
		components,
	});

	addGameObject(stateEntity);

	return stateEntity;
}
