require('../style/main.scss');
import '@babel/polyfill';

import Room from './core/Room';
import Viewport from './core/Viewport';

import Game from './modules/Game';
import Map from './modules/Map';

import Dialog from './entities/Dialog';
import Player from './entities/Player';
import NonPlayer from './entities/NonPlayer';
import Structure from './entities/Structure';

import {Knight} from './creatureTypes/Knight';
import {GreenKnight} from './creatureTypes/GreenKnight';
import {Slime} from './creatureTypes/Slime';
import {KingSlime} from './creatureTypes/KingSlime';
import {Tree} from './structureTypes/Tree';
import {Wall} from './structureTypes/Wall';

const canvas = document.querySelector('.canvas__sorcerer');

const MAP_SIZE_WIDTH = 36;
const MAP_SIZE_HEIGHT = 24;
const TILE_SIZE = 16;

const room = new Room({
	width: MAP_SIZE_WIDTH * TILE_SIZE,
	height: MAP_SIZE_HEIGHT * TILE_SIZE,
});

room.setBackgroundColor('#000');

const viewport = new Viewport(canvas, {x: 0, y: 0}, {width: 240, height: 176});
viewport.showRoom(room);

const map = new Map({
	width: MAP_SIZE_WIDTH,
	height: MAP_SIZE_HEIGHT,
}, room);

const game = new Game();
game.setCurrentMap(map);

const player = new Player(GreenKnight);

map.addActor(player, {
	x: MAP_SIZE_WIDTH / 2,
	y: MAP_SIZE_HEIGHT / 2
});

game.setPlayer(player);
viewport.followEntity(player);
fillMap(map);

let dialog = new Dialog({
	position: {
		x: 20,
		y: 20,
	},
	size: {
		width: 40,
		height: 10,
	},
	positioning: 'relative',
	visible: false,
});
room.addEntity(dialog);

window.addEventListener('keydown', (event) => {
	if (event.key === 'm') {
		event.preventDefault();

		console.log("Hey!");

		if (dialog.isVisible()) {
			dialog.hide();
		} else {
			dialog.show();
			dialog.displayMessage("???????????????????????!");
		}
	}
});

game.start();

function fillMap(map) {
	map.forEachTile((tile) => {
		if (!tile.hasSolidEntities()) {
			if (onChance(40)) {
				map.addActor(new NonPlayer(Slime), tile.position);

				return;
			}

			if (onChance(240)) {
				map.addActor(new NonPlayer(Knight), tile.position);

				return;
			}

			if (onChance(40)) {
				map.addStructure(new Structure(Tree), tile.position);

				return;
			}

			if (onChance(80)) {
				map.addStructure(new Structure(Wall), tile.position);

				return;
			}
		}

		if (
			!map.hasSolidEntitiesInBoundaries(tile.position, KingSlime.size)
			&& map.areBoundariesWithinMapBoundaries(tile.position, KingSlime.size)
		) {
			if (onChance(240)) {
				map.addActor(new NonPlayer(KingSlime), tile.position);

				return;
			}
		}
	});
}

function onChance(denominator) {
	return Math.round(Math.random() * denominator) === 1;
}
