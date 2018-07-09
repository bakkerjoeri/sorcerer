import gameStateStore from './library/core/model/gameStateStore';
import Game from './library/core/module/Game';
import {createRoom} from './library/core/module/Room';
import {addRoom, addGameObjectToRoom} from './library/core/model/rooms';
import {setGameName, setCurrentRoomId} from './library/core/model/game';
import {createGameObject, addGameObjectAndAddToCurrentRoom} from './library/core/module/GameObject';
import {addComponentToGameObject} from './library/core/model/gameObjects';
import Actor from './gameObject/Actor';
import Tile from './gameObject/Tile';
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

// Create a room
gameStateStore.dispatch(setGameName('Sorcerer'));
let room = createRoom({
	size: {
		width: 240,
		height: 176,
	},
});

gameStateStore.dispatch(addRoom(room));
gameStateStore.dispatch(setCurrentRoomId(room.id));
createTileSet(LEVEL_WIDTH, LEVEL_HEIGHT).forEach((tile) => {
	addGameObjectAndAddToCurrentRoom(tile);
});

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
	positionInLevel: {
		x: 3,
		y: 3,
	},
});

addGameObjectAndAddToCurrentRoom(playerGameObject);

let amountOfSlimesToCreate = 4;

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
		positionInLevel: positionInLevel,
		brain: {},
	});

	addGameObjectAndAddToCurrentRoom(slimeGameObject);

	amountOfSlimesToCreate -= 1;
}

let game = new Game(document.querySelector('.canvas__sorcerer'), 4);

console.log(gameStateStore.getState());

game.addSystem(new PlayerActionSystem());
game.addSystem(new ActionSystem());
game.addSystem(new PositionInLevelSystem());
game.addSystem(new ActionTickerSystem());
game.addSystem(new AnimationSystem());
game.addSystem(new RenderSystem());

game.start();


// Create tiles
function createTileSet(width, height) {
	let tiles = [];

	for (let y = 0; y < height; y = y + 1) {
		for (let x = 0; x < width; x = x + 1) {
			tiles.push(new Tile({
				id: [x][y],
				positionInLevel: {
					x: x,
					y: y,
				},
			}));
		}
	}

	return tiles;
}
