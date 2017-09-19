require('../style/main.scss');

import Room from './core/Room';
import Viewport from './core/Viewport';

import Game from './entities/Game';
import Player from './entities/Player';
import NonPlayer from './entities/NonPlayer';
import Wall from './entities/Wall';

const canvas = document.querySelector('.canvas__sorcerer');

const room = new Room({width: 1000, height: 500});
room.setBackgroundColor('#000');

const viewport = new Viewport(canvas, {x: 0, y: 0}, {width: 240, height: 160});
viewport.showRoom(room);

const game = new Game(room);

game.setPlayer(new Player({
	position: {x: 16, y: 16}
}));

game.addNonPlayer(new NonPlayer({
	position: {x: 144, y: 64}
}));

game.addObject(new Wall({
	position: {x: 48, y: 32}
}));

game.addObject(new Wall({
	position: {x: 64, y: 32}
}));

game.addObject(new Wall({
	position: {x: 64, y: 48}
}));
