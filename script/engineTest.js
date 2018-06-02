import gameStateStore from './library/core/model/gameStateStore';
import {createGameObject} from './library/core/module/GameObject';
import {createRoom} from './library/core/module/Room';
import {createViewport} from './library/core/module/Viewport';
import {createSprite} from './library/core/module/Sprite';
import {createSpriteFrame} from './library/core/module/SpriteFrame';
import {createSpriteSheet} from './library/core/module/SpriteSheet';
import {setGameName, setCurrentRoomId} from './library/core/model/actions/game';
import {addGameObject, setSpriteIdForGameObject} from './library/core/model/actions/gameObjects';
import {addRoom, addViewportToRoom, addGameObjectToRoom} from './library/core/model/actions/rooms';
import {addViewport, setViewportIsActive} from './library/core/model/actions/viewports';
import {addSprite, addSpriteFrameToSprite} from './library/core/model/actions/sprites';
import {addSpriteFrame} from './library/core/model/actions/spriteFrames';
import {addSpriteSheet} from './library/core/model/actions/spriteSheets';

import {startGame} from './library/core/module/Game';

// Give the game a name
gameStateStore.dispatch(setGameName('Sorcerer'));

// Create a sprite sheet
let spriteSheet = createSpriteSheet({
	filePath: 'assets/images/greenknight.png',
});
gameStateStore.dispatch(addSpriteSheet(spriteSheet));

// Create a sprite frame
let spriteFrame1 = createSpriteFrame({
	spriteSheet: spriteSheet.id,
	size: {
		width: 16,
		height: 16,
	},
});
let spriteFrame2 = createSpriteFrame({
	spriteSheet: spriteSheet.id,
	origin: {
		x: 16,
		y: 0,
	},
	size: {
		width: 16,
		height: 16,
	},
});
gameStateStore.dispatch(addSpriteFrame(spriteFrame1));
gameStateStore.dispatch(addSpriteFrame(spriteFrame2));

// Create the player sprite
let playerSprite = createSprite();
gameStateStore.dispatch(addSprite(playerSprite));
gameStateStore.dispatch(addSpriteFrameToSprite(playerSprite.id, spriteFrame1.id))
gameStateStore.dispatch(addSpriteFrameToSprite(playerSprite.id, spriteFrame2.id))

// Create player game object.
let playerGameObject = createGameObject();
gameStateStore.dispatch(addGameObject(playerGameObject));
gameStateStore.dispatch(setSpriteIdForGameObject(playerGameObject.id, playerSprite.id));

// Create viewport
let viewport = createViewport({
	size: {
		width: 100,
		height: 100,
	},
	gameObjectIdToFollow: playerGameObject.id,
});
gameStateStore.dispatch(addViewport(viewport));

// Create room
let room = createRoom({
	size: {
		width: 400,
		height: 400,
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
