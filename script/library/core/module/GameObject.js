import store from './../model/gameStateStore.js';
import createStateEntity from './../utility/createStateEntity.js';
import {addGameObject} from './../model/gameObjects.js';

export function createGameObject(components = {}) {
	let stateEntity = createStateEntity('gameObject', {
		components,
	});

	store.dispatch(addGameObject(stateEntity));

	return stateEntity;
}

export function doesGameObjectHaveComponents(gameObject, componentNames) {
	return componentNames.every((componentName) => {
		return doesGameObjectHaveComponent(gameObject, componentName);
	});
}

export function doesGameObjectHaveComponent(gameObject, componentName) {
	return gameObject.components.hasOwnProperty(componentName);
}
