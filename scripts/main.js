require('../style/main.scss');

import Room from './core/Room';
import Viewport from './core/Viewport';

import Game from './modules/Game';

import Player from './entities/Player';
import NonPlayer from './entities/NonPlayer';
import Wall from './entities/Wall';
import Tree from './entities/Tree';

import {Knight} from './creatureTypes/Knight';
import {GreenKnight} from './creatureTypes/GreenKnight';
import {Slime} from './creatureTypes/Slime';
import {KingSlime} from './creatureTypes/KingSlime';

const canvas = document.querySelector('.canvas__sorcerer');

const room = new Room({width: 544, height: 416});
room.setBackgroundColor('#000');

const viewport = new Viewport(canvas, {x: 0, y: 0}, {width: 240, height: 176});
viewport.showRoom(room);

const game = new Game(room);
const player = new Player(GreenKnight, {
	position: {x: 16, y: 16}
});

game.setPlayer(player);
viewport.followEntity(player);

for(let x = 0; x < room.size.width/16; x += 1) {
	for(let y = 0; y < room.size.height/16; y += 1) {
		let position = {x: x * 16, y: y * 16};
		if (!room.hasSolidEntityInBoundaries({
			x: position.x,
			y: position.y,
			width: 32,
			height: 32,
		})) {
			if (onChance(240)) {
				game.addNonPlayer(new NonPlayer(KingSlime, {
					position: position,
				}));

				continue;
			}
		}

		if (!room.hasSolidEntityInBoundaries({
			x: position.x,
			y: position.y,
			width: 16,
			height: 16,
		})) {
			if (onChance(80)) {
				game.addNonPlayer(new NonPlayer(Slime, {
					position: position,
				}));

				continue;
			}

			if (onChance(160)) {
				game.addNonPlayer(new NonPlayer(Knight, {
					position: position,
				}));

				continue;
			}

			if (onChance(30)) {
				game.addObject(new Wall({
					position: position,
				}));

				continue;
			}

			if (onChance(70)) {
				game.addObject(new Tree({
					position: position,
				}));

				continue;
			}
		}
	}
}

function onChance(denominator) {
	return Math.round(Math.random() * denominator) === 1;
}
