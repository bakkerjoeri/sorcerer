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

// Create room
const room = new Room({
	width: MAP_SIZE_WIDTH * TILE_SIZE,
	height: MAP_SIZE_HEIGHT * TILE_SIZE,
});
room.setBackgroundColor('#000');
room.useCanvas(canvas);

// Create world map
const worldMap = new Map({
	width: MAP_SIZE_WIDTH,
	height: MAP_SIZE_HEIGHT,
}, room);

// Create the player
const player = new Player(GreenKnight);

// Fill world map with all entities.
worldMap.addActor(player, {
	x: MAP_SIZE_WIDTH / 2,
	y: MAP_SIZE_HEIGHT / 2
});
fillMap(worldMap);

// Create a Viewport
const viewport = new Viewport({x: 0, y: 0}, {width: 240, height: 176});
viewport.followEntity(player);
room.useViewport(viewport);

// Assemble the game!
const game = new Game({
	room: room,
	level: worldMap,
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
