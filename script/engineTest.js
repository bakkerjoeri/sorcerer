import gameStateStore from './core/model/gameStateStore';
import {createGameObject} from './core/module/GameObject';
import {createRoom} from './core/module/Room';
import {createViewport} from './core/module/Viewport';
import {setGameName, setCurrentRoomId} from './core/model/actions/game';
import {addGameObject} from './core/model/actions/gameObjects';
import {addRoom, addViewportToRoom, addGameObjectToRoom} from './core/model/actions/rooms';
import {addViewport, setViewportIsActive} from './core/model/actions/viewports';

// Give the game a name
gameStateStore.dispatch(setGameName('Sorcerer'));

// Create player game object.
let playerGameObject = createGameObject();
gameStateStore.dispatch(addGameObject(playerGameObject));

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
