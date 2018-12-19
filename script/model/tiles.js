export const addTile = tile => state => ({
	...state,
	tiles: {
		...state.tiles,
		[tile.id]: tile,
	},
});

export const addEntityToTile = (tileId, entityId) => state => ({
	...state,
	tiles: {
		...state.tiles,
		[tileId]: {
			...state.tiles[tileId],
			entities: [
				...state.tiles[tileId].entities,
				entityId,
			],
		},
	},
});

export const removeEntityFromTile = (tileId, entityId) => state => ({
	...state,
	tiles: {
		...state.tiles,
		[tileId]: {
			...state.tiles[tileId],
			entities: [
				...state.tiles[tileId].entities.slice(0, state.tiles[tileId].entities.indexOf(entityId)),
				...state.tiles[tileId].entities.slice(state.tiles[tileId].entities.indexOf(entityId) + 1),
			],
		},
	},
});

export const getTileWithId = (state, tileId) => {
	return state.tiles[tileId];
}
