require('../style/main.scss');
import '@babel/polyfill';

import Room from 'core/Room';
import Viewport from 'core/Viewport';
import SpriteManager from 'core/SpriteManager';

import Game from 'module/Game';
import Level from 'module/Level';

import Dialog from 'object/Dialog';
import Player from 'object/Player';
import NonPlayer from 'object/NonPlayer';
import Structure from 'object/Structure';

import {Knight} from 'resource/creature/Knight';
import {GreenKnight} from 'resource/creature/GreenKnight';
import {Slime} from 'resource/creature/Slime';
import {KingSlime} from 'resource/creature/KingSlime';
import {Tree} from 'resource/structure/Tree';
import {Wall} from 'resource/structure/Wall';
import {Grave} from 'resource/structure/Grave';

const CANVAS_SIZE_WIDTH = 240;
const CANVAS_SIZE_HEIGHT = 176;
const MAP_SIZE_WIDTH = 10;
const MAP_SIZE_HEIGHT = 10;
const TILE_SIZE = 16;

load();

async function load() {
	await SpriteManager.loadLibrary('assets/sprites.json');

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
	const level = new Level({
		width: MAP_SIZE_WIDTH,
		height: MAP_SIZE_HEIGHT,
	}, room);

	// Create the player
	const player = new Player(GreenKnight);

	// Fill world map with all entities.
	level.addActor(player, {
		x: MAP_SIZE_WIDTH / 2,
		y: MAP_SIZE_HEIGHT / 2,
	});
	fillLevel(level);

	// Create a Viewport
	const playerViewport = new Viewport({width: CANVAS_SIZE_WIDTH, height: CANVAS_SIZE_HEIGHT}, {
		origin: {
			x: 0,
			y: 0,
		},
	});
	playerViewport.followGameObject(player);
	room.addViewport(playerViewport);

	// Assemble the game!
	const game = new Game({
		room: room,
		level: level,
	});
	game.start();
}

function fillLevel(level) {
	level.forEachTile((tile) => {
		if (!tile.hasSolidEntities()) {
			// if (onChance(40)) {
			// 	level.addActor(new NonPlayer(Slime), tile.position);
			//
			// 	return;
			// }
			//
			// if (onChance(240)) {
			// 	level.addActor(new NonPlayer(Knight), tile.position);
			//
			// 	return;
			// }
			//
			// if (onChance(40)) {
			// 	level.addStructure(new Structure(Tree), tile.position);
			//
			// 	return;
			// }
			//
			// if (onChance(200)) {
			// 	level.addStructure(new Structure(Grave), tile.position);
			//
			// 	return;
			// }
			//
			// if (onChance(80)) {
			// 	level.addStructure(new Structure(Wall), tile.position);
			//
			// 	return;
			// }
		}

		if (
			!level.hasSolidEntitiesInBoundaries(tile.position, KingSlime.size)
			&& level.areBoundariesWithinLevelBoundaries(tile.position, KingSlime.size)
		) {
			if (onChance(240)) {
				level.addActor(new NonPlayer(KingSlime), tile.position);

				return;
			}
		}
	});
}

function onChance(denominator) {
	return Math.round(Math.random() * denominator) === 1;
}
