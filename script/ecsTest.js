import gameStateStore from './library/core/model/gameStateStore';
import Game from './library/core/module/Game';
import {appendState} from './library/core/model/general';
import {setGameName, setCurrentRoomId} from './library/core/model/game';
import {addGameObjectToRoom} from './library/core/model/rooms';
import {createRoom} from './library/core/module/Room';
import {createLevelOfSize, moveEntityToPositionInLevel} from './module/Level';
import Actor from './gameObject/Actor';
import Structure from './gameObject/Structure';
import HealthComponent from './component/HealthComponent';
import SpriteComponent from './component/SpriteComponent';
import loadSprites from './loadSprites';

import AnimationSystem from './library/core/system/AnimationSystem';
import ActionSystem from './system/ActionSystem';
import ActionTickerSystem from './system/ActionTickerSystem';
import PlayerActionSystem from './system/PlayerActionSystem';
import PositionInLevelSystem from './system/PositionInLevelSystem';
import RenderSystem from './library/core/system/RenderSystem';

loadSprites();

const LEVEL_WIDTH = 7;
const LEVEL_HEIGHT = 7;

// Append game state
appendState({
	levels: {},
	tiles: {}
});

setGameName('Sorcerer');

// Create a room
let room = createRoom({
	size: {
		width: 240,
		height: 176,
	},
});

setCurrentRoomId(room.id);

// Create a level
let level = createLevelOfSize({
	width: 3,
	height: 3,
});

// Create some entities
let playerGameObject = new Actor({
	name: 'Green Knight',
	player: true,
	health: new HealthComponent({
		maximum: 20,
	}),
	sprite: new SpriteComponent({
		assetId: 'greenknight',
		framesPerSecond: 10,
	}),
});

addGameObjectToRoom(room.id, playerGameObject.id)
moveEntityToPositionInLevel(playerGameObject.id, {
	x: 1,
	y: 1,
}, level.id);

let game = new Game(document.querySelector('.canvas__sorcerer'), 4);

game.addSystem(new PlayerActionSystem());
game.addSystem(new ActionSystem());
game.addSystem(new PositionInLevelSystem());
game.addSystem(new ActionTickerSystem());
game.addSystem(new AnimationSystem());
game.addSystem(new RenderSystem());

game.start();

console.log(gameStateStore.getState());

let slimeGameObject = new Structure({
	sprite: new SpriteComponent({
		assetId: 'wall',
	}),
});

addGameObjectToRoom(room.id, slimeGameObject.id);
moveEntityToPositionInLevel(slimeGameObject.id, {
	x: 0,
	y: 1,
}, level.id);

function createSlimes(amountOfSlimesToCreate) {
	while(amountOfSlimesToCreate > 0) {
		let positionInLevel = {
			x: Math.floor(Math.random() * LEVEL_WIDTH),
			y: Math.floor(Math.random() * LEVEL_HEIGHT),
		};

		let slimeGameObject = new Actor({
			nonPlayer: true,
			health: new HealthComponent({
				maximum: 10,
			}),
			sprite: new SpriteComponent({
				assetId: 'slime',
				framesPerSecond: 1,
			}),
			brain: {},
		});

		addGameObjectToRoom(room.id, slimeGameObject.id);
		moveEntityToPositionInLevel(slimeGameObject.id, positionInLevel, level.id);

		amountOfSlimesToCreate -= 1;
	}
}
