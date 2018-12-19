import store from './library/core/model/gameStateStore.js';
import Game from './library/core/module/Game.js';
import setupInterfaceEvents from './library/core/module/setupInterfaceEvents.js';
import {appendState} from './library/core/model/general.js';
import {addViewportToRoom} from './library/core/model/rooms.js';
import {createRoom} from './library/core/module/Room.js';
import {createViewport} from './library/core/module/Viewport.js';
import {createLevelOfSize, createGameObjectAtPositionInLevel} from './module/Level.js';

import GreenKnight from './gameObjects/actors/GreenKnight.js';
import KingSlime from './gameObjects/actors/KingSlime.js';
import Slime from './gameObjects/actors/Slime.js';
import RustyDagger from './gameObjects/items/equipment/RustyDagger.js';

import loadSprites from './assets/loadSprites.js';

import updateActionTicks from './eventHandlers/updateActionTicks.js';
import updatePositioningOfViewports from './library/core/eventHandlers/updatePositioningOfViewports.js';

import ActionSystem from './system/ActionSystem.js';
import AnimationSystem from './library/core/system/AnimationSystem.js';
import AttackSystem from './system/AttackSystem.js';
import BrainSystem from './system/BrainSystem.js';
import DamageSystem from './system/DamageSystem.js';
import DeathSystem from './system/DeathSystem.js';
import EquipmentDamageSystem from './system/EquipmentDamageSystem.js';
import LogSystem from './system/LogSystem.js';
import PlayerControlSystem from './system/PlayerControlSystem.js';
import PositionInLevelSystem from './system/PositionInLevelSystem.js';
import RenderSystem from './library/core/system/RenderSystem.js';

let game = new Game(store, 'Sorcerer', document.querySelector('.canvas__sorcerer'), { scale: 4 });
setupInterfaceEvents(game);

loadSprites();

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

game.setCurrentRoom(room.id);

// Create a level
let level = createLevelOfSize({
	width: LEVEL_WIDTH,
	height: LEVEL_HEIGHT,
}, {
	roomId: room.id,
});

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
	position: {
		x: 0,
		y: 0,
	},
	size: {
		width: 240,
		height: 176,
	},
});

store.dispatch(addViewportToRoom(room.id, viewport.id));

game.addSystem(new PlayerControlSystem(game));
game.addSystem(new BrainSystem(game));
game.addSystem(new ActionSystem(game));
game.addEventHandler('update', updateActionTicks);
game.addSystem(new AttackSystem(game));
game.addSystem(new DamageSystem(game));
game.addSystem(new EquipmentDamageSystem(game));
game.addSystem(new DeathSystem(game));
game.addSystem(new LogSystem(game));
game.addSystem(new PositionInLevelSystem(game));
game.addEventHandler('beforeDraw', updatePositioningOfViewports);
game.addSystem(new AnimationSystem(game));
game.addSystem(new RenderSystem(game));

game.start();

console.log(store.getState());
