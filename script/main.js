import store from './library/core/model/gameStateStore.js';
import Game from './library/core/module/Game.js';
import setupInterfaceEvents from './library/core/module/setupInterfaceEvents.js';
import { appendState } from './library/core/model/general.js';
import { setCurrentRoomId } from './library/core/model/game.js';
import { addRoom, addGameObjectToRoom, addViewportToRoom } from './library/core/model/rooms.js';
import { createRoom } from './library/core/module/Room.js';
import { createTileSet } from './module/Tile.js';
import { addTile } from './model/tiles.js';
import { addViewport } from './library/core/model/viewports.js';
import { addGameObject } from './library/core/model/gameObjects.js';

import { createViewport } from './library/core/module/Viewport.js';
import { addLevel } from './model/levels.js';
import { createLevel, createGameObjectAtPositionInLevelPure, moveGameObjectToPositionInLevel } from './module/Level.js';

import GreenKnight from './gameObjects/actors/GreenKnight.js';
import KingSlime from './gameObjects/actors/KingSlime.js';
import Slime from './gameObjects/actors/Slime.js';
import RustyDagger from './gameObjects/items/equipment/RustyDagger.js';

import loadSprites from './assets/loadSprites.js';

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
game.addEventHandler('keydown', makeAttemptActionForKey(game.emitEvent));
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
	})

	state = addRoom(room)(state);
	state = setCurrentRoomId(room.id)(state);

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

	// Create the player character
	let player = new GreenKnight({
		player: true,
	});

	state = addGameObject(player)(state);
	state = addGameObjectToRoom(room.id, player.id)(state);
	state = moveGameObjectToPositionInLevel(state, player, {x: 1, y: 1}, level.id);

	state = createGameObjectAtPositionInLevelPure(state, level.id, {x: 1, y: 0}, RustyDagger);
	state = createGameObjectAtPositionInLevelPure(state, level.id, {x: 2, y: 1}, Slime, {nonPlayer: true});
	state = createGameObjectAtPositionInLevelPure(state, level.id, {x: 3, y: 3}, KingSlime, {nonPlayer: true});
	state = createGameObjectAtPositionInLevelPure(state, level.id, {x: 5, y: 3}, Slime, {nonPlayer: true});

	let viewport = createViewport({
		gameObjectIdToFollow: player.id,
		size: {
			width: 240,
			height: 178,
		},
	});

	state = addViewport(viewport)(state);
	state = addViewportToRoom(room.id, viewport.id)(state);

	return state;
}

game.start();

console.log(store.getState());
