import gameStateStore from './gameStateStore';

export const addTile = tile => gameStateStore.dispatch(state => ({
	...state,
	tiles: {
		...state.tiles,
		[tile.id]: tile,
	},
}));

export const addEntityToTile = (tileId, entityId) => gameStateStore.dispatch(state => ({
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
}));

export const removeEntityFromTile = (tileId, entityId) => gameStateStore.dispatch(state => ({
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
}));
