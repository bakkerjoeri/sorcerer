import store from './library/core/model/gameStateStore.js';
import Game from './library/core/module/Game.js';
import {appendState} from './library/core/model/general.js';
import {setGameName, setCurrentRoomId} from './library/core/model/game.js';
import {addViewportToRoom} from './library/core/model/rooms.js';
import {createRoom} from './library/core/module/Room.js';
import {createViewport} from './library/core/module/Viewport.js';
import {createLevelOfSize, createGameObjectAtPositionInLevel} from './module/Level.js';

import GreenKnight from './gameObject/GreenKnight.js';
import KingSlime from './gameObject/KingSlime.js';
import Slime from './gameObject/Slime.js';

import loadSprites from './assets/loadSprites.js';

import AnimationSystem from './library/core/system/AnimationSystem.js';
import BrainSystem from './system/BrainSystem.js';
import ActionSystem from './system/ActionSystem.js';
import ActionTickerSystem from './system/ActionTickerSystem.js';
import PlayerControlSystem from './system/PlayerControlSystem.js';
import DamageSystem from './system/DamageSystem.js';
import DeathSystem from './system/DeathSystem.js';
import PositionInLevelSystem from './system/PositionInLevelSystem.js';
import RenderSystem from './library/core/system/RenderSystem.js';
import ViewportPositionSystem from './library/core/system/ViewportPositionSystem.js';

loadSprites();

const LEVEL_WIDTH = 30;
const LEVEL_HEIGHT = 22;

// Append game state
store.dispatch(appendState({
	levels: {},
	tiles: {}
}));

store.dispatch(setGameName('Sorcerer'));

// Create a room
let room = createRoom({
	size: {
		width: LEVEL_WIDTH * 16,
		height: LEVEL_HEIGHT * 16,
	},
});

store.dispatch(setCurrentRoomId(room.id));

// Create a level
let level = createLevelOfSize({
	width: LEVEL_WIDTH,
	height: LEVEL_HEIGHT,
}, {
	roomId: room.id,
});

let player = createGameObjectAtPositionInLevel(level.id, {x: 1, y: 1}, GreenKnight, {player: true});
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

let game = new Game(document.querySelector('.canvas__sorcerer'), 4);

game.addSystem(new PlayerControlSystem());
game.addSystem(new BrainSystem());
game.addSystem(new ActionTickerSystem());
game.addSystem(new ActionSystem());
game.addSystem(new DamageSystem());
game.addSystem(new DeathSystem());
game.addSystem(new PositionInLevelSystem());
game.addSystem(new AnimationSystem());
game.addSystem(new RenderSystem());
game.addSystem(new ViewportPositionSystem());

game.start();

console.log(store.getState());
