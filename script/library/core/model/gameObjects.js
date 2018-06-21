export const addGameObject = gameObject => state => ({
	...state,
	gameObjects: {
		...state.gameObjects,
		[gameObject.id]: gameObject,
	}
});

export const setSpriteIdForGameObject = (id, spriteId) => state => ({
	...state,
	gameObjects: {
		...state.gameObjects,
		[id]: {
			...state.gameObjects[id],
			spriteId: spriteId,
		}
	}
});

export const changePositionOfGameObject = (id, newPosition) => state => ({
	...state,
	gameObjects: {
		...state.gameObjects,
		[id]: {
			...state.gameObjects[id],
			position: newPosition,
		}
	}
});

export const getGameObjects = state => {
	return Object.values(state.gameObjects);
}

export const getGameObjectWithId = (state, gameObjectId) => {
	return state.gameObjects[gameObjectId];
}

export const getGameObjectsInRoomWithId = (state, roomId) => {
	return state.rooms[roomId].gameObjects.map(gameObjectId => getGameObjectWithId(state, gameObjectId));
}

export const getVisibleGameObjectsInRoomWithId = (state, roomId) => {
	return getGameObjectsInRoomWithId(state, roomId).filter(gameObject => gameObject.isVisible);
}
