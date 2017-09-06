require('../style/main.scss');

import Room from './core/Room';
import Viewport from './core/Viewport';

import Player from './entities/Player';
import Slime from './entities/Slime';
import Wall from './entities/Wall';

const canvas = document.querySelector('.canvas__sorcerer');
const room = new Room({width: 2000, height: 1000});
const viewport = new Viewport(canvas, {x: 0, y: 0}, {width: 1200, height: 780});

room.setBackgroundColor('#000');

room.addEntity(new Player({
	position: {x: 16, y: 16}
}));

room.addEntity(new Slime({
	position: {x: 144, y: 64}
}));

room.addEntity(new Wall({
	position: {x: 48, y: 32}
}));

room.addEntity(new Wall({
	position: {x: 64, y: 32}
}));

room.addEntity(new Wall({
	position: {x: 64, y: 48}
}));

viewport.showRoom(room);
