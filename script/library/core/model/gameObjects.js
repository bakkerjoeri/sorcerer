import gameStateStore from './gameStateStore';

export const addGameObject = gameObject => gameStateStore.dispatch(state => ({
	...state,
	gameObjects: {
		...state.gameObjects,
		[gameObject.id]: gameObject,
	},
}));

export const addComponentToGameObject = (gameObjectId, componentName, componentValue) => gameStateStore.dispatch(state => ({
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
}));

export const updateComponentOfGameObject = (gameObjectId, componentName, updatedComponentValue) => gameStateStore.dispatch(state => ({
	...state,
	gameObjects: {
		...state.gameObjects,
		[gameObjectId]: {
			...state.gameObjects[gameObjectId],
			components: {
				...state.gameObjects[gameObjectId].components,
				[componentName]: {
					...state.gameObjects[gameObjectId].components[componentName],
					...updatedComponentValue,
				},
			},
		},
	},
}));

export const removeComponentFromGameObject = (gameObjectId, componentName) => gameStateStore.dispatch(state => ({
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
}));

export const getGameObjectWithId = gameObjectId => {
	return gameStateStore.getState().gameObjects[gameObjectId];
};

export const getAllGameObjects = () => {
	return Object.values(gameStateStore.getState().gameObjects);
};

export const getGameObjectsWithComponentNames = (componentNames = []) => {
	let allGameObjects = getAllGameObjects();

	if (componentNames.length === 0) {
		return allGameObjects;
	}

	return allGameObjects.filter((gameObject) => {
		return componentNames.every((componentName) => {
			return gameObject.components.hasOwnProperty(componentName);
		})
	});
};

export const getComponentValueForGameObject = (gameObjectId, componentName) => {
	return getGameObjectWithId(gameObjectId).components[componentName];
};

export const getGameObjectsInCurrentRoom = () => {
	return getGameObjectsInRoomWithId(gameStateStore.getState().game.currentRoomId);
};

export const getGameObjectsInRoomWithId = roomId => {
	return gameStateStore.getState().rooms[roomId].gameObjects.map((gameObjectId) => getGameObjectWithId(gameObjectId));
};
