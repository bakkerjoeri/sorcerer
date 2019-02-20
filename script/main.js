import store from './library/core/model/gameStateStore.js';
import Game from './library/core/module/Game.js';
import setupInterfaceEvents from './library/core/module/setupInterfaceEvents.js';
import loadSprites from './assets/loadSprites.js';

import { appendState } from './library/core/model/general.js';
import { setCurrentRoomId } from './library/core/model/game.js';
import { addRoom, addGameObjectToRoom, addViewportToRoom } from './library/core/model/rooms.js';
import { addTile } from './model/tiles.js';
import { addViewport } from './library/core/model/viewports.js';
import { addGameObject } from './library/core/model/gameObjects.js';
import { createViewport } from './library/core/module/Viewport.js';
import { addLevel, getTilesInLevel } from './model/levels.js';

import { createRoom } from './library/core/module/Room.js';
import { createTileSet } from './module/Tile.js';
import { createLevel, createGameObjectAtPositionInLevel, moveGameObjectToPositionInLevel, doesLevelHaveSolidEntitiesInBoundaries, doPositionsInBoundariesExistInLevel } from './module/Level.js';

import GreenKnight from './gameObjects/actors/GreenKnight.js';
import Knight from './gameObjects/actors/Knight.js';
import KingSlime from './gameObjects/actors/KingSlime.js';
import Slime from './gameObjects/actors/Slime.js';
import RustyDagger from './gameObjects/items/equipment/RustyDagger.js';
import Wall from './gameObjects/structures/Wall.js';
import Grave from './gameObjects/structures/Grave.js';
import Tree from './gameObjects/structures/Tree.js';

import updateActionTicks from './eventHandlers/updateActionTicks.js';
import updatePositionOfGameObjects from './eventHandlers/updatePositionOfGameObjects.js';
import updatePositioningOfViewports from './library/core/eventHandlers/updatePositioningOfViewports.js';
import animateGameObjects from './library/core/eventHandlers/animateGameObjects.js';
import drawFrame from './library/core/eventHandlers/drawFrame.js';
import { makeAttemptActionForKey } from './eventHandlers/attemptActionForKey.js'
import { makeGameObjectDies } from './eventHandlers/gameObjectDies.js';
import { doDeathRattle } from './eventHandlers/doDeathRattle.js';
import { log } from './eventHandlers/log.js';
import { makeDecideActions } from './eventHandlers/decideActions.js';
import { makeActTowardsPosition } from './eventHandlers/actTowardsPosition.js';
import { makePickUp } from './eventHandlers/pickUp.js';
import { concludeTurn } from './eventHandlers/concludeTurn.js';
import { makeWait } from './eventHandlers/wait.js';
import { makeAttackTarget } from './eventHandlers/attackTarget.js';
import { makeDealDamage } from './eventHandlers/dealDamage.js';
import { makeTakeDamage } from './eventHandlers/takeDamage.js';
import { makeCheckForDeath } from './eventHandlers/checkForDeath.js';
import { calculateEquipmentDamage } from './eventHandlers/calculateEquipmentDamage.js';

const LEVEL_WIDTH = 30;
const LEVEL_HEIGHT = 22;

let game = new Game(store, 'Sorcerer', document.querySelector('.canvas__sorcerer'), { scale: 3 });

game.addEventHandler('init', initializeGame);
game.addEventHandler('keyDown', makeAttemptActionForKey(game.emitEvent));
game.addEventHandler('update', makeDecideActions(game.emitEvent));
game.addEventHandler('actTowardsPosition', makeActTowardsPosition(game.emitEvent));
game.addEventHandler('actPickUp', makePickUp(game.emitEvent));
game.addEventHandler('actWait', makeWait(game.emitEvent));
game.addEventHandler('concludeTurn', concludeTurn);
game.addEventHandler('update', updateActionTicks);
game.addEventHandler('attackTarget', makeAttackTarget(game.emitEvent));
game.addEventHandler('beforeDealDamage', calculateEquipmentDamage);
game.addEventHandler('dealDamage', makeDealDamage(game.emitEvent));
game.addEventHandler('takeDamage', makeTakeDamage(game.emitEvent));
game.addEventHandler('hasTakenDamage', makeCheckForDeath(game.emitEvent));
game.addEventHandler('death', makeGameObjectDies(game.emitEvent));
game.addEventHandler('death', doDeathRattle);
game.addEventHandler('log', log);
game.addEventHandler('beforeDraw', updatePositionOfGameObjects);
game.addEventHandler('beforeDraw', updatePositioningOfViewports);
game.addEventHandler('beforeDraw', animateGameObjects);
game.addEventHandler('draw', drawFrame);

setupInterfaceEvents(game);

function initializeGame(state) {
	state = appendState({
		levels: {},
		tiles: {}
	})(state);

	state = loadSprites(state);

	// Create a room
	let room = createRoom({
		size: {
			width: LEVEL_WIDTH * 16,
			height: LEVEL_HEIGHT * 16,
		},
	});

	state = addRoom(room)(state);
	state = setCurrentRoomId(room.id)(state);

	// Create the player character
	let player = new GreenKnight({
		player: true,
	});

	state = addGameObject(player)(state);
	state = addGameObjectToRoom(room.id, player.id)(state);

	state = createRandomLevel(state, room, player);

	let viewport = createViewport({
		gameObjectIdToFollow: player.id,
		size: {
			width: 240,
			height: 176,
		},
	});

	state = addViewport(viewport)(state);
	state = addViewportToRoom(room.id, viewport.id)(state);

	return state;
}

function createRandomLevel(state, room, player) {
	// Create a tileset
	let tiles = createTileSet({
		width: LEVEL_WIDTH,
		height: LEVEL_HEIGHT,
	});

	state = tiles.reduce((newState, tile) => {
		return addTile(tile)(newState);
	}, state);

	// Create a level
	let level = createLevel({
		size: {
			width: LEVEL_WIDTH,
			height: LEVEL_HEIGHT,
		},
		roomId: room.id,
		tiles: tiles.map((tile) => {
			return tile.id;
		}),
	});

	state = addLevel(level)(state);

	state = moveGameObjectToPositionInLevel(state, player, {
		x: Math.floor(LEVEL_WIDTH / 2),
		y: Math.floor(LEVEL_WIDTH / 2),
	}, level.id);

	state = fillWithRandomStuff(state, level);

	return state;
}

function fillWithRandomStuff(state, level) {
	return getTilesInLevel(state, level.id).reduce((newState, tile) => {
		if (!doesLevelHaveSolidEntitiesInBoundaries(newState, level.id, tile.positionInLevel, { width: 1, height: 1 })) {
			if (onChance(500)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, RustyDagger);
			}

			if (onChance(40)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Slime, {
					nonPlayer: true,
				});
			}

			if (onChance(240)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Knight, {
					nonPlayer: true,
				});
			}

			if (onChance(40)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Tree);
			}

			if (onChance(200)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Grave);
			}

			if (onChance(10)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Wall);
			}
		}

		if (
			!doesLevelHaveSolidEntitiesInBoundaries(newState, level.id, tile.positionInLevel, { width: 2, height: 2 })
			&& doPositionsInBoundariesExistInLevel(newState, level.id, tile.positionInLevel, { width: 2, height: 2 })
		) {
			if (onChance(240)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, KingSlime, {
					nonPlayer: true,
				});
			}
		}

		return newState;
	}, state);
}

function onChance(denominator) {
	return Math.floor(Math.random() * denominator + 1) === 1;
}

game.start();

console.log(store.getState());
