import gameStateStore from './../library/core/model/gameStateStore';
import {getTilesInLevel} from './levels';

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

export const getTileWithId = (tileId) => {
	return gameStateStore.getState().tiles[tileId];
}

export const getTilesInLevelAtRange = (levelId, position, offset) => {
	return getTilesInLevel(levelId).filter((tile) => {
		return tile.positionInLevel.x >= position.x
			&& tile.positionInLevel.x <= (position.x + offset.width - 1)
			&& tile.positionInLevel.y >= position.y
			&& tile.positionInLevel.y <= (position.y + offset.height - 1);
	});
}
