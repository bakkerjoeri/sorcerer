import gameStateStore from './core/model/gameStateStore';
import {createGameObject} from './core/module/GameObject';
import {createRoom} from './core/module/Room';
import {createViewport} from './core/module/Viewport';
import {createSprite} from './core/module/Sprite';
import {createSpriteFrame} from './core/module/SpriteFrame';
import {createSpriteSheet} from './core/module/SpriteSheet';
import {setGameName, setCurrentRoomId} from './core/model/actions/game';
import {addGameObject, setSpriteForGameObject} from './core/model/actions/gameObjects';
import {addRoom, addViewportToRoom, addGameObjectToRoom} from './core/model/actions/rooms';
import {addViewport, setViewportIsActive} from './core/model/actions/viewports';
import {addSprite, addSpriteFrameToSprite} from './core/model/actions/sprites';
import {addSpriteFrame} from './core/model/actions/spriteFrames';
import {addSpriteSheet} from './core/model/actions/spriteSheets';

// Give the game a name
gameStateStore.dispatch(setGameName('Sorcerer'));

// Create a sprite sheet
let spriteSheet = createSpriteSheet({
	filePath: 'assets/images/greenknight.png',
});
gameStateStore.dispatch(addSpriteSheet(spriteSheet));

// Create a sprite frame
let spriteFrame = createSpriteFrame({
	spriteSheet: spriteSheet.id,
	size: {
		width: 16,
		height: 16,
	},
});
gameStateStore.dispatch(addSpriteFrame(spriteFrame));

// Create the player sprite
let playerSprite = createSprite();
gameStateStore.dispatch(addSprite(playerSprite));
gameStateStore.dispatch(addSpriteFrameToSprite(playerSprite.id, spriteFrame.id))

// Create player game object.
let playerGameObject = createGameObject();
gameStateStore.dispatch(addGameObject(playerGameObject));
gameStateStore.dispatch(setSpriteForGameObject(playerGameObject.id, playerSprite.id));

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
