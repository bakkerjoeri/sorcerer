import createStateEntity from './../library/core/utility/createStateEntity.js';
import store from './../library/core/model/gameStateStore.js';
import getPositionsInRange from './../utility/getPositionsInRange.js';
import { addGameObjectToRoom } from './../library/core/model/rooms.js';
import {
	addGameObject,
	getGameObjectWithId,
	updateComponentOfGameObject,
	getComponentValueForGameObject,
	removeComponentFromGameObject,
} from './../library/core/model/gameObjects.js';
import { getLevelWithId, getTilesInLevel } from './../model/levels.js';
import { addEntityToTile, removeEntityFromTile } from './../model/tiles.js';
import { createTileSet } from './Tile.js';

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

export function createGameObjectInLevelPure(state, levelId, EntityClass, components = {}) {
	let level = getLevelWithId(state, levelId);
	let gameObject = new EntityClass(components);

	state = addGameObject(gameObject)(state);
	state = addGameObjectToRoom(level.roomId, gameObject.id)(state);

	return state;
}

export function createGameObjectAtPositionInLevel(levelId, positionInLevel, EntityClass, components = {}) {
	let entity = createGameObjectInLevel(levelId, EntityClass, components);

	moveEntityToPositionInLevel(entity.id, positionInLevel, levelId);

	return entity;
}

export function createGameObjectAtPositionInLevelPure(state, levelId, positionInLevel, EntityClass, components = {}) {
	let level = getLevelWithId(state, levelId);
	let gameObject = new EntityClass(components);

	state = addGameObject(gameObject)(state);
	state = addGameObjectToRoom(level.roomId, gameObject.id)(state);
	state = moveGameObjectToPositionInLevel(state, gameObject, positionInLevel, levelId);

	return state;
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

export function moveGameObjectToPositionInLevel(state, gameObject, position, levelId) {
	if (gameObject.components.currentLevelId) {
		state = removeGameObjectFromPositionInLevel(state, gameObject, levelId, gameObject.components.positionInLevel);
	}

	if (gameObject.components.currentLevelId !== levelId) {
		state = updateComponentOfGameObject(gameObject.id, 'currentLevelId', levelId)(state);
	}

	state = getTilesInLevelAtRange(state, levelId, position, gameObject.components.sizeInLevel).reduce((newState, tile) => {
		return addEntityToTile(tile.id, gameObject.id)(newState);
	}, state);

	state = updateComponentOfGameObject(gameObject.id, 'positionInLevel', position)(state);

	return state;
}

export function removeEntityFromPositionInLevel(entityId, levelId, position) {
	let entity = getGameObjectWithId(store.getState(), entityId);

	getTilesInLevelAtRange(store.getState(), levelId, position, entity.components.sizeInLevel).forEach((tile) => {
		store.dispatch(removeEntityFromTile(tile.id, entityId));
	});

	store.dispatch(removeComponentFromGameObject(entityId, 'positionInLevel'));
}

export function removeGameObjectFromPositionInLevel(state, gameObject, levelId, position) {
	state = getTilesInLevelAtRange(state, levelId, position, gameObject.components.sizeInLevel).reduce((newState, tile) => {
		return removeEntityFromTile(tile.id, gameObject.id)(newState);
	}, state);

	state = removeComponentFromGameObject(gameObject.id, 'positionInLevel')(state);

	return state;
}

export function canEntityBeAtPositionInLevel(state, levelId, entityId, positionInLevel) {
	let entity = getGameObjectWithId(state, entityId);
	let {sizeInLevel} = entity.components;

	return doPositionsInBoundariesExistInLevel(state, levelId, positionInLevel, sizeInLevel)
		&& !doesLevelHaveSolidEntitiesInBoundaries(state, levelId, positionInLevel, sizeInLevel, [entityId]);
}

export function getEntitiesAtBoundariesInLevel(state, levelId, position, offset, excludedEntityIds = []) {
	return getTilesInLevelAtRange(state, levelId, position, offset)
		.reduce((allEntities, tile) => {
			return [...allEntities, ...tile.entities];
		}, [])
		.filter(entityId => !excludedEntityIds.includes(entityId))
		.map(entityId => getGameObjectWithId(state, entityId));
}

export function getSolidEntitiesAtBoundariesInLevel(state, levelId, position, offset, excludedEntityIds = []) {
	return getEntitiesAtBoundariesInLevel(state, levelId, position, offset, excludedEntityIds).filter((entity) => {
		return getComponentValueForGameObject(state, entity.id, 'isSolid');
	});
}

export function doesLevelHaveSolidEntitiesInBoundaries(state, levelId, position, offset, excludedEntityIds = []) {
	return getSolidEntitiesAtBoundariesInLevel(state, levelId, position, offset, excludedEntityIds).length;
}

export function doesPositionExistInLevel(state, levelId, position) {
	let level = getLevelWithId(state, levelId);

	return position.x >= 0
		&& position.y >= 0
		&& position.x <= level.size.width - 1
		&& position.y <= level.size.height - 1;
}

export function getPositionsInRangeInLevel(state, levelId, position, offset) {
	return getPositionsInRange(position, offset).filter(positionInRange => {
		return doesPositionExistInLevel(state, levelId, positionInRange);
	});
}

export function doPositionsInBoundariesExistInLevel(state, levelId, position, offset) {
	debugger;
	return getPositionsInRange(position, offset).every(positionInRange => {
		return doesPositionExistInLevel(state, levelId, positionInRange);
	});
}

export function getTileInLevelWithPosition(state, levelId, position) {
	return getTilesInLevel(state, levelId).find((tile) => {
		return tile.positionInLevel.x === position.x
			&& tile.positionInLevel.y === position.y;
	});
}

export function getTilesInLevelAtRange(state, levelId, position, offset = {width: 1, height: 1}) {
	return getTilesInLevel(state, levelId).filter((tile) => {
		return tile.positionInLevel.x >= position.x
			&& tile.positionInLevel.x <= (position.x + offset.width - 1)
			&& tile.positionInLevel.y >= position.y
			&& tile.positionInLevel.y <= (position.y + offset.height - 1);
	});
}
