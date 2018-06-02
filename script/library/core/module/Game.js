import {getRoomWithId} from './../model/selectors/rooms';
import gameStateStore from './../model/gameStateStore';
import {updateRoom, drawRoomOntoContext} from './Room';

let canvas;
let context;

export function startGame(canvasSelector, scale) {
	canvas = document.querySelector(canvasSelector);
	context = canvas.getContext('2d');

	changeCanvasScale(canvas, scale);

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

function changeCanvasScale(canvas, scale = 1) {
	let canvasBoundaries = canvas.getBoundingClientRect();

	canvas.width = canvasBoundaries.width / scale;
	canvas.height = canvasBoundaries.height / scale;
}
