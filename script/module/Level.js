import createStateEntity from './../library/core/utility/createStateEntity';
import store from './../library/core/model/gameStateStore';
import getPositionsInRange from './../utility/getPositionsInRange';
import {getGameObjectWithId, updateComponentOfGameObject, getComponentValueForGameObject} from './../library/core/model/gameObjects';
import {addLevel, getLevelWithId} from './../model/levels';
import {getTileInLevelWithPosition, getTilesInLevelAtRange, addEntityToTile, removeEntityFromTile} from './../model/tiles';
import {createTileSet} from './Tile';

export function createLevel(properties = {}) {
	const DEFAULT_PROPERTIES = {
		roomId: null,
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

	store.dispatch(addLevel(level));

	return level;
}

export function createLevelOfSize(size, properties = {}) {
	let tiles = createTileSet(size);
	let tileIdsInLevel = tiles.map(tile => tile.id);

	let level = createLevel({
		...properties,
		...{
			size: size,
			tiles: tileIdsInLevel,
		}
	});

	return level;
}

export function moveEntityToPositionInLevel(entityId, position, levelId) {
	let entity = getGameObjectWithId(store.getState(), entityId);

	if (entity.components.currentLevelId !== null) {
		removeEntityFromPositionInLevel(entityId, levelId, entity.components.positionInLevel);
	}

	if (entity.components.currentLevelId !== levelId) {
		store.dispatch(updateComponentOfGameObject(entityId, 'currentLevelId', levelId));
	}

	getTilesInLevelAtRange(store.getState(), levelId, position, entity.components.sizeInLevel).forEach((tile) => {
		store.dispatch(addEntityToTile(tile.id, entityId));
	});

	store.dispatch(updateComponentOfGameObject(entityId, 'positionInLevel', position));
}

export function removeEntityFromPositionInLevel(entityId, levelId, position) {
	let entity = getGameObjectWithId(store.getState(), entityId);

	getTilesInLevelAtRange(store.getState(), levelId, position, entity.components.sizeInLevel).forEach((tile) => {
		store.dispatch(removeEntityFromTile(tile.id, entityId));
	});
}

export function canEntityMoveToPositionInLevel(levelId, entityId, positionInLevel) {
	let entity = getGameObjectWithId(store.getState(), entityId);
	let {sizeInLevel} = entity.components;

	return doPositionsInBoundariesExistInLevel(levelId, positionInLevel, sizeInLevel)
		&& !doesLevelHaveSolidEntitiesInBoundaries(levelId, positionInLevel, sizeInLevel, [entityId]);
}

export function getEntitiesAtBoundariesInLevel(levelId, position, offset, excludedEntityIds = []) {
	return getTilesInLevelAtRange(store.getState(), levelId, position, offset)
		.reduce((allEntities, tile) => {
			return [...allEntities, ...tile.entities];
		}, [])
		.filter(entityId => !excludedEntityIds.includes(entityId))
		.map(entityId => getGameObjectWithId(store.getState(), entityId));
}

export function getSolidEntitiesAtBoundariesInLevel(levelId, position, offset, excludedEntityIds = []) {
	return getEntitiesAtBoundariesInLevel(levelId, position, offset, excludedEntityIds).filter((entity) => {
		return getComponentValueForGameObject(store.getState(), entity.id, 'isSolid');
	});
}

export function doesLevelHaveSolidEntitiesInBoundaries(levelId, position, offset, excludedEntityIds = []) {
	return getSolidEntitiesAtBoundariesInLevel(levelId, position, offset, excludedEntityIds).length;
}

export function doesPositionExistInLevel(levelId, position) {
	let level = getLevelWithId(store.getState(), levelId);

	return position.x >= 0
		&& position.y >= 0
		&& position.x <= level.size.width - 1
		&& position.y <= level.size.height - 1;
}

export function doPositionsInBoundariesExistInLevel(levelId, position, offset) {
	return getPositionsInRange(position, offset).every(positionInRange => {
		return doesPositionExistInLevel(levelId, positionInRange);
	});
}
