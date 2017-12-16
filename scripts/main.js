require('../style/main.scss');
require('@babel/polyfill');

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
	width: 5,
	height: 5,
}, room);

const game = new Game();
game.setCurrentMap(map);

const player = new Player(GreenKnight);

map.addActor(player, {x: 1, y: 1});
map.addActor(new NonPlayer(KingSlime), {x: 1, y: 2});

game.setPlayer(player);
viewport.followEntity(player);
fillMap(map);
game.start();

function fillMap(map) {
	map.forEachTile((tile) => {
		if (!tile.hasSolidEntities()) {
			// if (onChance(40)) {
			// 	map.addActor(new NonPlayer(Slime), tile.position);
            //
			// 	return;
			// }
            //
			// if (onChance(240)) {
			// 	map.addActor(new NonPlayer(Knight), tile.position);
            //
			// 	return;
			// }

			if (onChance(40)) {
				map.addStructure(new Wall(), tile.position);

				return;
			}

			if (onChance(80)) {
				map.addStructure(new Tree(), tile.position);

				return;
			}
		}

		// if (
		// 	!map.hasSolidEntitiesInBoundaries(tile.position, KingSlime.size)
		// 	&& map.areBoundariesWithinMapBoundaries(tile.position, KingSlime.size)
		// ) {
		// 	if (onChance(240)) {
		// 		map.addActor(new NonPlayer(KingSlime), tile.position);
        //
		// 		return;
		// 	}
		// }
	});
}

function onChance(denominator) {
	return Math.round(Math.random() * denominator) === 1;
}
