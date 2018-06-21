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
