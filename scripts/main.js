require('../style/main.scss');

import Room from './core/Room';
import Viewport from './core/Viewport';

import Player from './entities/Player';
import Slime from './entities/Slime';

const canvas = document.querySelector('.canvas__sorcerer');
const room = new Room({width: 2000, height: 1000});
const viewport = new Viewport(canvas, {x: 0, y: 0}, {width: 1200, height: 780});
const player = new Player({
	position: {x: 16, y: 16}
});

const slime = new Slime({
	position: {x: 144, y: 64}
});

room.setBackgroundColor('#000');

room.addEntity(player);
room.addEntity(slime);

viewport.showRoom(room);
