require('../style/main.scss');

import Room from './core/Room';
import Viewport from './core/Viewport';

import Game from './entities/Game';
import Player from './entities/Player';
import NonPlayer from './entities/NonPlayer';
import Wall from './entities/Wall';
import Tree from './entities/Tree';

import {Knight} from './creatureTypes/Knight';
import {Slime} from './creatureTypes/Slime';

const canvas = document.querySelector('.canvas__sorcerer');

const room = new Room({width: 272, height: 208});
room.setBackgroundColor('#000');

const viewport = new Viewport(canvas, {x: 0, y: 0}, {width: 240, height: 176});
viewport.showRoom(room);

const game = new Game(room);
const player = new Player(Knight, {
	position: {x: 16, y: 16}
});

game.setPlayer(player);
viewport.followEntity(player);

game.addNonPlayer(new NonPlayer(Slime, {
	position: {x: 144, y: 64}
}));

game.addNonPlayer(new NonPlayer(Slime, {
	position: {x: 96, y: 80}
}));

game.addNonPlayer(new NonPlayer(Slime, {
	position: {x: 48, y: 48}
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

game.addObject(new Tree({
	position: {x: 128, y: 64}
}));
