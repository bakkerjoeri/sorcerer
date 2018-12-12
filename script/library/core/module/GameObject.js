import store from './../model/gameStateStore.js';
import createStateEntity from './../utility/createStateEntity.js';
import {addGameObject, getGameObjectsInCurrentRoom} from './../model/gameObjects.js';

export function createGameObject(components = {}) {
	let stateEntity = createStateEntity('gameObject', {
		components,
	});

	store.dispatch(addGameObject(stateEntity));

	return stateEntity;
}

export function findGameObjects(requiredComponentNames) {
	let gameObjects = getGameObjectsInCurrentRoom(store.getState());

	return gameObjects.filter((gameObject) => {
		return doesGameObjectHaveComponents(gameObject, requiredComponentNames);
	});
}

export function doesGameObjectHaveComponents(gameObject, componentNames = []) {
	return componentNames.every((componentName) => {
		return doesGameObjectHaveComponent(gameObject, componentName);
	});
}

export function doesGameObjectHaveComponent(gameObject, componentName = []) {
	return gameObject.components.hasOwnProperty(componentName);
}
