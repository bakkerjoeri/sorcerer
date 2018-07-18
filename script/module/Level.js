import createStateEntity from './../library/core/utility/createStateEntity';
import {getGameObjectWithId, updateComponentOfGameObject} from './../library/core/model/gameObjects';
import {addLevel, getLevelWithId} from './../model/levels';
import {getTilesInLevelAtRange, addEntityToTile} from './../model/tiles';
import {createTileSet} from './Tile';

export function createLevel(properties = {}) {
	const DEFAULT_PROPERTIES = {
		size: {
			width: 0,
			height: 0,
		},
		tiles: [],
	}

	let level = createStateEntity('level', {
		...DEFAULT_PROPERTIES,
		...properties,
	});

	addLevel(level);

	return level;
}

export function createLevelOfSize(size, properties = {}) {
	let tiles = createTileSet(size);
	let tileIdsInLevel = tiles.map(tile => tile.id);

	let level = createLevel({
		size: size,
		tiles: tileIdsInLevel,
	});

	return level;
}

export function addEntityToPositionInLevel(entityId, levelId, position) {
	let entity = getGameObjectWithId(entityId);
	let newLevel = getLevelWithId(levelId);

	if (entity.components.currentLevel) {
		// remove from current level
		// remove from tiles at current position in current level
	}

	getTilesInLevelAtRange(levelId, position, entity.components.sizeInLevel).forEach((tile) => {
		addEntityToTile(tile.id, entityId);
	});

	updateComponentOfGameObject(entityId, 'positionInLevel', position);
}
