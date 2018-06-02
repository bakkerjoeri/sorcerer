export function getGameObjects(state) {
	return Object.values(state.gameObjects);
}

export function getGameObjectsInRoomWithId(state, roomId) {
	return state.rooms[roomId].gameObjects.map(gameObjectId => state.gameObjects[gameObjectId]);
}

export function getVisibleGameObjectsInRoomWithId(state, roomId) {
	return getGameObjectsInRoomWithId(state, roomId).filter(gameObject => gameObject.isVisible);
}
