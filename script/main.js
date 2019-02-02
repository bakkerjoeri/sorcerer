import store from './library/core/model/gameStateStore.js';
import Game from './library/core/module/Game.js';
import setupInterfaceEvents from './library/core/module/setupInterfaceEvents.js';
import { appendState } from './library/core/model/general.js';
import { addViewportToRoom, addRoom } from './library/core/model/rooms.js';
import { createRoom } from './library/core/module/Room.js';
import { addViewport } from './library/core/model/viewports.js';
import { createViewport } from './library/core/module/Viewport.js';
import { addLevel } from './model/levels.js';
import { createLevelOfSize, createGameObjectAtPositionInLevel } from './module/Level.js';

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

let game = new Game(store, 'Sorcerer', document.querySelector('.canvas__sorcerer'), { scale: 3 });

setupInterfaceEvents(game);
store.setState(loadSprites(store.getState()));

const LEVEL_WIDTH = 30;
const LEVEL_HEIGHT = 22;

// Append game state
store.dispatch(appendState({
	levels: {},
	tiles: {}
}));

// Create a room
let room = createRoom({
	size: {
		width: LEVEL_WIDTH * 16,
		height: LEVEL_HEIGHT * 16,
	},
});

store.dispatch(addRoom(room));
game.setCurrentRoom(room.id);

// Create a level
let level = createLevelOfSize({
	width: LEVEL_WIDTH,
	height: LEVEL_HEIGHT,
}, {
	roomId: room.id,
});

store.dispatch(addLevel(level));

let player = createGameObjectAtPositionInLevel(level.id, {x: 1, y: 1}, GreenKnight, {
	player: true,
});
createGameObjectAtPositionInLevel(level.id, {x: 1, y: 0}, RustyDagger);
createGameObjectAtPositionInLevel(level.id, {x: 2, y: 1}, Slime, {nonPlayer: true});
createGameObjectAtPositionInLevel(level.id, {x: 3, y: 3}, KingSlime, {nonPlayer: true});
createGameObjectAtPositionInLevel(level.id, {x: 5, y: 3}, Slime, {nonPlayer: true});

// Create a viewport
let viewport = createViewport({
	gameObjectIdToFollow: player.id,
	size: {
		width: 240,
		height: 178,
	},
});

store.dispatch(addViewport(viewport));
store.dispatch(addViewportToRoom(room.id, viewport.id));

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

game.start();

console.log(store.getState());
