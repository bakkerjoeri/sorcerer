import {getRoomWithId} from './../model/selectors/rooms';
import gameStateStore from './../model/gameStateStore';
import {updateRoom, drawRoomOntoContext} from './Room';

let canvas;
let context;

export function startGame(canvasSelector) {
	canvas = document.querySelector(canvasSelector);
	context = canvas.getContext('2d');

	window.requestAnimationFrame((time) => {
		updateGame(time, context);
	});
}

function updateGame(time, context) {
	if (gameStateStore.getState().game.currentRoomId) {
		let currentRoom = getRoomWithId(gameStateStore.getState(), gameStateStore.getState().game.currentRoomId);

		updateRoom(time, currentRoom);
		drawRoomOntoContext(currentRoom, context);
	}

	window.requestAnimationFrame((time) => {
		updateGame(time, context);
	});
}
