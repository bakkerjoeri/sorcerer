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

export function createPureGameObject(components = {}) {
	return createStateEntity('gameObject', {
		components,
	});
}

export function findGameObjects(requiredComponentNames) {
	return findGameObjectsFromState(store.getState(), requiredComponentNames);
}

export function findGameObjectsFromState(state, requiredComponentNames) {
	let gameObjects = getGameObjectsInCurrentRoom(state);

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
