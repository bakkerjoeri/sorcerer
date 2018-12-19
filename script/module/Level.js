import createStateEntity from './../library/core/utility/createStateEntity.js';
import store from './../library/core/model/gameStateStore.js';
import getPositionsInRange from './../utility/getPositionsInRange.js';
import {addGameObjectToRoom} from './../library/core/model/rooms.js';
import {
	getGameObjectWithId,
	updateComponentOfGameObject,
	getComponentValueForGameObject,
	removeComponentFromGameObject,
} from './../library/core/model/gameObjects.js';
import {addLevel, getLevelWithId, getTilesInLevel} from './../model/levels.js';
import {addEntityToTile, removeEntityFromTile} from './../model/tiles.js';
import {createTileSet} from './Tile.js';

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

export function createGameObjectInLevel(levelId, EntityClass, components = {}) {
	let level = getLevelWithId(store.getState(), levelId);
	let entity = new EntityClass(components);

	store.dispatch(addGameObjectToRoom(level.roomId, entity.id));

	return entity;
}

export function createGameObjectAtPositionInLevel(levelId, positionInLevel, EntityClass, components = {}) {
	let entity = createGameObjectInLevel(levelId, EntityClass, components);

	moveEntityToPositionInLevel(entity.id, positionInLevel, levelId);

	return entity;
}

export function moveEntityToPositionInLevel(entityId, position, levelId) {
	let entity = getGameObjectWithId(store.getState(), entityId);

	if (entity.components.currentLevelId !== null) {
		removeEntityFromPositionInLevel(entityId, levelId, entity.components.positionInLevel);
	}

	if (entity.components.currentLevelId !== levelId) {
		store.dispatch(updateComponentOfGameObject(entityId, 'currentLevelId', levelId));
	}

	getTilesInLevelAtRange(levelId, position, entity.components.sizeInLevel).forEach((tile) => {
		store.dispatch(addEntityToTile(tile.id, entityId));
	});

	store.dispatch(updateComponentOfGameObject(entityId, 'positionInLevel', position));
}

export function removeEntityFromPositionInLevel(entityId, levelId, position) {
	let entity = getGameObjectWithId(store.getState(), entityId);

	getTilesInLevelAtRange(levelId, position, entity.components.sizeInLevel).forEach((tile) => {
		store.dispatch(removeEntityFromTile(tile.id, entityId));
	});

	store.dispatch(removeComponentFromGameObject(entityId, 'positionInLevel'));
}

export function canEntityBeAtPositionInLevel(levelId, entityId, positionInLevel) {
	let entity = getGameObjectWithId(store.getState(), entityId);
	let {sizeInLevel} = entity.components;

	return doPositionsInBoundariesExistInLevel(levelId, positionInLevel, sizeInLevel)
		&& !doesLevelHaveSolidEntitiesInBoundaries(levelId, positionInLevel, sizeInLevel, [entityId]);
}

export function getEntitiesAtBoundariesInLevel(levelId, position, offset, excludedEntityIds = []) {
	return getTilesInLevelAtRange(levelId, position, offset)
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

export function getPositionsInRangeInLevel(levelId, position, offset) {
	return getPositionsInRange(position, offset).filter(positionInRange => {
		return doesPositionExistInLevel(levelId, positionInRange);
	});
}

export function doPositionsInBoundariesExistInLevel(levelId, position, offset) {
	return getPositionsInRange(position, offset).every(positionInRange => {
		return doesPositionExistInLevel(levelId, positionInRange);
	});
}

export function getTileInLevelWithPosition(levelId, position) {
	return getTilesInLevel(store.getState(), levelId).find((tile) => {
		return tile.positionInLevel.x === position.x
			&& tile.positionInLevel.y === position.y;
	});
}

export function getTilesInLevelAtRange(levelId, position, offset = {width: 1, height: 1}) {
	return getTilesInLevel(store.getState(), levelId).filter((tile) => {
		return tile.positionInLevel.x >= position.x
			&& tile.positionInLevel.x <= (position.x + offset.width - 1)
			&& tile.positionInLevel.y >= position.y
			&& tile.positionInLevel.y <= (position.y + offset.height - 1);
	});
}
