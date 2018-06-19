export function getGameObjects(state) {
	return Object.values(state.gameObjects);
}

export function getGameObjectWithId(state, gameObjectId) {
	return state.gameObjects[gameObjectId];
}

export function getGameObjectsInRoomWithId(state, roomId) {
	return state.rooms[roomId].gameObjects.map(gameObjectId => getGameObjectWithId(state, gameObjectId));
}

export function getVisibleGameObjectsInRoomWithId(state, roomId) {
	return getGameObjectsInRoomWithId(state, roomId).filter(gameObject => gameObject.isVisible);
}
