import Room from 'core/Room';
import Viewport from 'core/Viewport';
import SpriteManager from 'core/SpriteManager';

import Game from 'module/Game';
import LevelGenerator from 'module/LevelGenerator';

import Dialog from 'object/Dialog';
import Player from 'object/Player';

import {GreenKnight} from 'resource/creature/GreenKnight';

const CANVAS_SIZE_WIDTH = 240;
const CANVAS_SIZE_HEIGHT = 176;
const MAP_SIZE_WIDTH = 36;
const MAP_SIZE_HEIGHT = 24;
const TILE_SIZE = 16;

load();

// Datastore testing
import createStore from 'core/createStore';
import reducer from 'reducer';

let store = createStore(reducer);

console.log(store.getState());

store.dispatch({
	type: 'DO_A_THING',
});

console.log(store.getState());

async function load() {
	await SpriteManager.loadLibrary('assets/sprites.json');

	// create canvas
	const canvas = document.querySelector('.canvas__sorcerer');
	canvas.width = CANVAS_SIZE_WIDTH;
	canvas.height = CANVAS_SIZE_HEIGHT;

	// Create room
	const room = new Room({
		width: MAP_SIZE_WIDTH * TILE_SIZE,
		height: MAP_SIZE_HEIGHT * TILE_SIZE,
	});
	room.setBackgroundColor('#000');
	room.useCanvas(canvas);

	// Create the player
	const player = new Player(GreenKnight);

	// Create world map
	const level = LevelGenerator.createLevel(room, player, 'king_slime_dijkstra_test')

	// Create a Viewport
	const playerViewport = new Viewport({width: CANVAS_SIZE_WIDTH, height: CANVAS_SIZE_HEIGHT}, {
		origin: {
			x: 0,
			y: 0,
		},
	});
	playerViewport.followGameObject(player);
	room.addViewport(playerViewport);

	// Assemble the game!
	const game = new Game({
		room: room,
		level: level,
	});
	game.start();
}
