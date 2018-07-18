import createStateEntity from './../library/core/utility/createStateEntity';
import gameStateStore from './../library/core/model/gameStateStore';
import getPositionsInRange from './../utility/getPositionsInRange';
import {getGameObjectWithId, updateComponentOfGameObject, getComponentValueForGameObject} from './../library/core/model/gameObjects';
import {addLevel, getLevelWithId} from './../model/levels';
import {getTileInLevelWithPosition, getTilesInLevelAtRange, addEntityToTile, removeEntityFromTile} from './../model/tiles';
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

export function moveEntityToPositionInLevel(entityId, position, levelId) {
	let entity = getGameObjectWithId(entityId);

	if (entity.components.currentLevelId !== null) {
		removeEntityFromPositionInLevel(entityId, levelId, entity.components.positionInLevel);
	}

	if (entity.components.currentLevelId !== levelId) {
		updateComponentOfGameObject(entityId, 'currentLevelId', levelId);
	}

	getTilesInLevelAtRange(levelId, position, entity.components.sizeInLevel).forEach((tile) => {
		addEntityToTile(tile.id, entityId);
	});

	updateComponentOfGameObject(entityId, 'positionInLevel', position);
}

export function removeEntityFromPositionInLevel(entityId, levelId, position) {
	let entity = getGameObjectWithId(entityId);

	getTilesInLevelAtRange(levelId, position, entity.components.sizeInLevel).forEach((tile) => {
		removeEntityFromTile(tile.id, entityId);
	});
}

export function canEntityBeInPositionInLevel(entityId, positionInLevel, levelId) {
	let entity = getGameObjectWithId(entityId);

	return getPositionsInRange(positionInLevel, entity.components.sizeInLevel).every((position) => {
		return doesPositionExistInLevel(levelId, position)
			&& isPositionInLevelFree(levelId, position);
	});
}

export function isPositionInLevelFree(levelId, position) {
	let tile = getTileInLevelWithPosition(levelId, position);

	return tile.entities.every((entity) => {
		return !getComponentValueForGameObject(entity, 'isSolid');
	});
}

export function doesPositionExistInLevel(levelId, position) {
	let level = getLevelWithId(levelId);

	return position.x >= 0
		&& position.y >= 0
		&& position.x <= level.size.width - 1
		&& position.y <= level.size.height - 1;
}
