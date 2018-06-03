import gameStateStore from './library/core/model/gameStateStore';
import {createGameObject} from './library/core/module/GameObject';
import {createRoom} from './library/core/module/Room';
import {createViewport} from './library/core/module/Viewport';
import {createSprite} from './library/core/module/Sprite';
import {createSpriteSheet, loadSpriteSheet} from './library/core/module/SpriteSheet';
import {setGameName, setCurrentRoomId} from './library/core/model/actions/game';
import {addGameObject, setSpriteIdForGameObject, changePositionOfGameObject} from './library/core/model/actions/gameObjects';
import {addRoom, addViewportToRoom, addGameObjectToRoom} from './library/core/model/actions/rooms';
import {addViewport, setViewportIsActive} from './library/core/model/actions/viewports';
import {addSprite, addSpriteFrameToSprite} from './library/core/model/actions/sprites';

import {startGame} from './library/core/module/Game';

// Give the game a name
gameStateStore.dispatch(setGameName('Sorcerer'));

// Create a sprite sheet
loadSpriteSheet('assets/images/greenknight.png', {
	width: 16,
	height: 16,
}, 0, 6);

// Create the player sprite
let playerSprite = createSprite({
	framesPerSecond: 10,
	spriteFrames: [1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 4, 5, 6],
});
gameStateStore.dispatch(addSprite(playerSprite));

// Create player game object.
let playerGameObject = createGameObject();
gameStateStore.dispatch(addGameObject(playerGameObject));
gameStateStore.dispatch(setSpriteIdForGameObject(playerGameObject.id, playerSprite.id));

const MAP_SIZE_WIDTH = 36;
const MAP_SIZE_HEIGHT = 24;
const TILE_SIZE = 16;

// Create viewport
let viewport = createViewport({
	size: {
		width: 240,
		height: 176,
	},
	gameObjectIdToFollow: playerGameObject.id,
});
gameStateStore.dispatch(addViewport(viewport));

// Create room
let room = createRoom({
	size: {
		width: MAP_SIZE_WIDTH * TILE_SIZE,
		height: MAP_SIZE_HEIGHT * TILE_SIZE,
	},
});
gameStateStore.dispatch(addRoom(room));

// Add a game object to the room
gameStateStore.dispatch(addGameObjectToRoom(room.id, playerGameObject.id));

// Add viewport to room
gameStateStore.dispatch(addViewportToRoom(room.id, viewport.id));

// Add the room to the game
gameStateStore.dispatch(setCurrentRoomId(room.id));

// Start the game
startGame('.canvas__sorcerer', 4);


document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowUp') {
		event.preventDefault();

		gameStateStore.dispatch(changePositionOfGameObject(playerGameObject.id, {
			x: gameStateStore.getState().gameObjects[playerGameObject.id].position.x,
			y: gameStateStore.getState().gameObjects[playerGameObject.id].position.y - 16,
		}));
	}

	if (event.key === 'ArrowRight') {
		event.preventDefault();

		gameStateStore.dispatch(changePositionOfGameObject(playerGameObject.id, {
			x: gameStateStore.getState().gameObjects[playerGameObject.id].position.x + 16,
			y: gameStateStore.getState().gameObjects[playerGameObject.id].position.y,
		}));
	}

	if (event.key === 'ArrowDown') {
		event.preventDefault();

		gameStateStore.dispatch(changePositionOfGameObject(playerGameObject.id, {
			x: gameStateStore.getState().gameObjects[playerGameObject.id].position.x,
			y: gameStateStore.getState().gameObjects[playerGameObject.id].position.y + 16,
		}));
	}

	if (event.key === 'ArrowLeft') {
		event.preventDefault();

		gameStateStore.dispatch(changePositionOfGameObject(playerGameObject.id, {
			x: gameStateStore.getState().gameObjects[playerGameObject.id].position.x - 16,
			y: gameStateStore.getState().gameObjects[playerGameObject.id].position.y,
		}));
	}
});
