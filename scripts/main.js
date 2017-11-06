require('../style/main.scss');

import Room from './core/Room';
import Viewport from './core/Viewport';

import Game from './modules/Game';
import Map from './modules/Map';

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

const map = new Map({
	width: 34,
	height: 26
}, room);

const game = new Game();
game.setCurrentMap(map);

const player = new Player(GreenKnight);

map.addActor(player, {x: 1, y: 1});
game.setPlayer(player);
viewport.followEntity(player);

// console.log(map.tiles);
map.forEachTile((tile) => {
	if (!tile.hasSolidEntities()) {
		if (onChance(80)) {
			map.addActor(new NonPlayer(Slime), tile.position);

			return;
		}

		if (onChance(160)) {
			map.addActor(new NonPlayer(Knight), tile.position);

			return;
		}

		if (onChance(30)) {
			map.addStructure(new Wall(), tile.position);

			return;
		}

		if (onChance(70)) {
			map.addStructure(new Tree(), tile.position);

			return;
		}

		// if (!room.hasSolidEntityInBoundaries({
		// 	x: screenPosition.x,
		// 	y: screenPosition.y,
		// 	width: 32,
		// 	height: 32,
		// })) {
		// 	if (onChance(240)) {
		// 		map.addActor(new NonPlayer(KingSlime), position);
		//
		// 		continue;
		// 	}
		// }
		//
	}
});

function onChance(denominator) {
	return Math.round(Math.random() * denominator) === 1;
}
