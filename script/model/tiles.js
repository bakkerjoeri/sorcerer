import {getTilesInLevel} from './levels.js';

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

export const getTileInLevelWithPosition = (state, levelId, position) => {
	return getTilesInLevel(state, levelId).find((tile) => {
		return tile.positionInLevel.x === position.x
			&& tile.positionInLevel.y === position.y;
	});
}

export const getTilesInLevelAtRange = (state, levelId, position, offset = {width: 1, height: 1}) => {
	return getTilesInLevel(state, levelId).filter((tile) => {
		return tile.positionInLevel.x >= position.x
			&& tile.positionInLevel.x <= (position.x + offset.width - 1)
			&& tile.positionInLevel.y >= position.y
			&& tile.positionInLevel.y <= (position.y + offset.height - 1);
	});
}
