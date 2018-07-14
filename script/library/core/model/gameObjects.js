import gameStateStore from './gameStateStore';
import createAction from './../../store/createAction';
import createSelector from './../../store/createSelector';

export const addGameObject = gameObject => createAction(gameStateStore, state => ({
	...state,
	gameObjects: {
		...state.gameObjects,
		[gameObject.id]: gameObject,
	},
}));

export const addComponentToGameObject = (gameObjectId, componentName, componentValue) => createAction(gameStateStore, state => ({
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

export const updateComponentOfGameObject = (gameObjectId, componentName, updatedComponentValue) => createAction(gameStateStore, state => ({
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

export const removeComponentFromGameObject = (gameObjectId, componentName) => createAction(gameStateStore, state => ({
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

export const getGameObjectWithId = gameObjectId => createSelector(gameStateStore, state => {
	return state.gameObjects[gameObjectId];
});

export const getAllGameObjects = () => createSelector(gameStateStore, state => {
	return Object.values(state.gameObjects);
});

export const getGameObjectsWithComponentNames = (componentNames = []) => createSelector(gameStateStore, state => {
	let allGameObjects = getAllGameObjects();

	if (componentNames.length === 0) {
		return allGameObjects;
	}

	return allGameObjects.filter((gameObject) => {
		return componentNames.every((componentName) => {
			return gameObject.components.hasOwnProperty(componentName);
		})
	});
});

export const getComponentValueForGameObject = (gameObjectId, componentName) => {
	return getGameObjectWithId(gameObjectId).components[componentName];
};

export const getGameObjectsInCurrentRoom = () => createSelector(gameStateStore, state => {
	return getGameObjectsInRoomWithId(state.game.currentRoomId);
});

export const getGameObjectsInRoomWithId = roomId => createSelector(gameStateStore, state => {
	return state.rooms[roomId].gameObjects.map((gameObjectId) => getGameObjectWithId(gameObjectId));
});
