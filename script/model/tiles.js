import gameStateStore from './gameStateStore';
import createAction from './../../store/createAction';
import createSelector from './../../store/createSelector';

export const addTile = tile => createAction(gameStateStore, state => ({
	...state,
	tiles: {
		...state.tiles,
		[tile.id]: tile,
	},
}));

export const addEntityToTile = (tileId, entityId) => createAction(gameStateStore, state => ({
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

export const removeEntityFromTile = (tileId, entityId) => createAction(gameStateStore, state => ({
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
