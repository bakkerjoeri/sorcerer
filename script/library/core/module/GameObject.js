import store from './../model/gameStateStore';
import createStateEntity, {StateEntity} from './../utility/createStateEntity';
import {addGameObject} from './../model/gameObjects';

export function createGameObject(components = {}) {
	let stateEntity = createStateEntity('gameObject', {
		components,
	});

	store.dispatch(addGameObject(stateEntity));

	return stateEntity;
}
