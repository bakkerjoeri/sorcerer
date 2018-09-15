import isObject from './../utility/isObject';
import {getCurrentRoomId} from './game';

export const addGameObject = gameObject => state => ({
	...state,
	gameObjects: {
		...state.gameObjects,
		[gameObject.id]: gameObject,
	},
});

export const setComponentForGameObject = (gameObjectId, componentName, componentValue) => state => ({
	...state,
	gameObjects: {
		...state.gameObjects,
		[gameObjectId]: {
			...state.gameObjects[gameObjectId],
			components: {
				...state.gameObjects[gameObjectId].components,
				[componentName]: componentValue,
			},
		},
	},
});

export const updateComponentOfGameObject = (gameObjectId, componentName, updatedComponentValue) => state => {
	let oldComponentValue = state.gameObjects[gameObjectId].components[componentName];
	let newComponentValue = updatedComponentValue;

	if (isObject(updatedComponentValue) && isObject(oldComponentValue)) {
		newComponentValue = {
			...oldComponentValue,
			...updatedComponentValue,
		};
	}

	return {
		...state,
		gameObjects: {
			...state.gameObjects,
			[gameObjectId]: {
				...state.gameObjects[gameObjectId],
				components: {
					...state.gameObjects[gameObjectId].components,
					[componentName]: newComponentValue,
				},
			},
		},
	}
};

export const removeComponentFromGameObject = (gameObjectId, componentName) => state => ({
	...state,
	gameObjects: {
		...state.gameObjects,
		[gameObjectId]: {
			...state.gameObjects[gameObjectId],
			components: Object.keys(state.gameObjects[gameObjectId].components).reduce((newObject, key) => {
				if (key !== componentName) {
					return {
						...newObject,
						[key]: state.gameObjects[gameObjectId].components[key]
					}
				}

				return newObject;
			}, {}),
		},
	},
});

export const getGameObjectWithId = (state, gameObjectId) => {
	return state.gameObjects[gameObjectId];
};

export const getAllGameObjects = (state) => {
	return Object.values(state.gameObjects);
};

export const getGameObjectsWithComponentNames = (state, componentNames = []) => {
	let allGameObjects = getAllGameObjects(state);

	if (componentNames.length === 0) {
		return allGameObjects;
	}

	return allGameObjects.filter((gameObject) => {
		return componentNames.every((componentName) => {
			return gameObject.components.hasOwnProperty(componentName);
		})
	});
};

export const getComponentValueForGameObject = (state, gameObjectId, componentName) => {
	return getGameObjectWithId(state, gameObjectId).components[componentName];
};

export const getGameObjectsInCurrentRoom = (state) => {
	return getGameObjectsInRoomWithId(state, getCurrentRoomId(state));
};

export const getGameObjectsInRoomWithId = (state, roomId) => {
	return state.rooms[roomId].gameObjects.map((gameObjectId) => {
		return getGameObjectWithId(state, gameObjectId)
	});
};
