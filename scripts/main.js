require('../style/main.scss');

import Game from './core/Game';
import Room from './core/Room';
import Player from './entities/Player';

let canvas = document.querySelector('.canvas__sorcerer');
let game = new Game(canvas, 1200, 720);

let room = new Room({
	origin: {x: 0, y: 0},
	size: {width: canvas.width, height: canvas.height},
	backgroundColor: '#000'
});

game.setRoom(room);

let player = new Player({
	position: {x: 16, y: 16}
});

room.addEntity(player);
