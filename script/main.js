import gameStateStore from './library/core/model/gameStateStore';
import Game from './library/core/module/Game';
import {appendState} from './library/core/model/general';
import {setGameName, setCurrentRoomId} from './library/core/model/game';
import {addGameObjectToRoom, addViewportToRoom} from './library/core/model/rooms';
import {createRoom} from './library/core/module/Room';
import {createViewport} from './library/core/module/Viewport';
import {createLevelOfSize, moveEntityToPositionInLevel} from './module/Level';
import Actor from './gameObject/Actor';
import Structure from './gameObject/Structure';
import HealthComponent from './component/HealthComponent';
import SpriteComponent from './library/core/component/SpriteComponent';
import loadSprites from './assets/loadSprites';

import AnimationSystem from './library/core/system/AnimationSystem';
import ActionSystem from './system/ActionSystem';
import ActionTickerSystem from './system/ActionTickerSystem';
import PlayerActionSystem from './system/PlayerActionSystem';
import PositionInLevelSystem from './system/PositionInLevelSystem';
import RenderSystem from './library/core/system/RenderSystem';
import ViewportPositionSystem from './library/core/system/ViewportPositionSystem';

loadSprites();

const LEVEL_WIDTH = 30;
const LEVEL_HEIGHT = 22;

// Append game state
appendState({
	levels: {},
	tiles: {}
});

setGameName('Sorcerer');

// Create a room
let room = createRoom({
	size: {
		width: LEVEL_WIDTH * 16,
		height: LEVEL_HEIGHT * 16,
	},
});

setCurrentRoomId(room.id);

// Create a level
let level = createLevelOfSize({
	width: LEVEL_WIDTH,
	height: LEVEL_HEIGHT,
}, {
	roomId: room.id,
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
	y: 0,
}, level.id);

createSlimeInLevelAtPosition(level.id, {x: 0, y: 0});
let kingSlimeGameObject = createKingSlimeInLevelAtPosition(level.id, {x: 3, y: 3});

let wallGameObject = new Structure({
	sprite: new SpriteComponent({
		assetId: 'wall',
	}),
});

addGameObjectToRoom(room.id, wallGameObject.id);
moveEntityToPositionInLevel(wallGameObject.id, {
	x: 0,
	y: 1,
}, level.id);

// Create a viewport
let viewport = createViewport({
	gameObjectIdToFollow: playerGameObject.id,
	position: {
		x: 0,
		y: 0,
	},
	size: {
		width: 240,
		height: 176,
	},
});

addViewportToRoom(room.id, viewport.id);
// addViewportToRoom(room.id, secondViewport.id);

let game = new Game(document.querySelector('.canvas__sorcerer'), 4);

game.addSystem(new PlayerActionSystem());
game.addSystem(new ActionSystem());
game.addSystem(new ActionTickerSystem());
game.addSystem(new PositionInLevelSystem());
game.addSystem(new AnimationSystem());

game.addSystem(new RenderSystem());
game.addSystem(new ViewportPositionSystem());

game.start();

console.log(gameStateStore.getState());

function createSlimes(amountOfSlimesToCreate) {
	while(amountOfSlimesToCreate > 0) {
		let positionInLevel = {
			x: Math.floor(Math.random() * LEVEL_WIDTH),
			y: Math.floor(Math.random() * LEVEL_HEIGHT),
		};

		createSlimeInLevelAtPosition(positionInLevel);

		amountOfSlimesToCreate -= 1;
	}
}

function createSlimeInLevelAtPosition(levelId, positionInLevel) {
	let slimeGameObject = new Actor({
		name: 'Slime',
		nonPlayer: true,
		health: new HealthComponent({
			maximum: 10,
		}),
		sprite: new SpriteComponent({
			assetId: 'slime',
			framesPerSecond: 2,
		}),
	});

	addGameObjectToRoom(room.id, slimeGameObject.id);
	moveEntityToPositionInLevel(slimeGameObject.id, positionInLevel, level.id);

	return slimeGameObject;
}

function createKingSlimeInLevelAtPosition(levelId, positionInLevel) {
	let kingSlimeGameObject = new Actor({
		name: 'King Slime',
		nonPlayer: true,
		health: new HealthComponent({
			maximum: 80,
		}),
		sprite: new SpriteComponent({
			assetId: 'giantslime',
			framesPerSecond: 1,
		}),
		sizeInLevel: {
			width: 2,
			height: 2,
		},
	});

	addGameObjectToRoom(room.id, kingSlimeGameObject.id);
	moveEntityToPositionInLevel(kingSlimeGameObject.id, positionInLevel, level.id);

	return kingSlimeGameObject;
}
