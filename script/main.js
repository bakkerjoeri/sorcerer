require('../style/main.scss');
import '@babel/polyfill';

import Game from 'core/Game';
import Room from 'core/Room';
import Viewport from 'core/Viewport';
import AssetManager from 'core/AssetManager';

import Map from 'module/Map';

import Dialog from 'entity/Dialog';
import Player from 'entity/Player';
import NonPlayer from 'entity/NonPlayer';
import Structure from 'entity/Structure';

import {Knight} from 'resource/creature/Knight';
import {GreenKnight} from 'resource/creature/GreenKnight';
import {Slime} from 'resource/creature/Slime';
import {KingSlime} from 'resource/creature/KingSlime';
import {Tree} from 'resource/structure/Tree';
import {Wall} from 'resource/structure/Wall';
import {Grave} from 'resource/structure/Grave';

const CANVAS_SIZE_WIDTH = 240;
const CANVAS_SIZE_HEIGHT = 176;
const MAP_SIZE_WIDTH = 36;
const MAP_SIZE_HEIGHT = 24;
const TILE_SIZE = 16;

// Load game!
AssetManager.loadSpriteIndex('assets/sprites.json').then(() => {
	// create canvas
	const canvas = document.querySelector('.canvas__sorcerer');
	canvas.width = CANVAS_SIZE_WIDTH;
	canvas.height = CANVAS_SIZE_HEIGHT;

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
		y: MAP_SIZE_HEIGHT / 2,
	});
	fillMap(worldMap);

	// Create a Viewport
	const playerViewport = new Viewport({width: 240, height: 176}, {
		origin: {
			x: 0,
			y: 0,
		},
	});
	playerViewport.followEntity(player);
	room.addViewport(playerViewport);

	// Assemble the game!
	const game = new Game({
		room: room,
		level: worldMap,
	});
	game.start();
});

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

			if (onChance(200)) {
				map.addStructure(new Structure(Grave), tile.position);

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
