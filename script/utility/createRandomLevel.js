import { LEVEL_WIDTH, LEVEL_HEIGHT } from './../constants.js';
import onChance from './../utility/random/onChance.js'
import { addTile } from './../model/tiles.js';
import { addLevel, getTilesInLevel } from './../model/levels.js';
import { createTileSet } from './../module/Tile.js';
import {
	createLevel,
	createGameObjectAtPositionInLevel,
	moveGameObjectToPositionInLevel,
	doesLevelHaveSolidEntitiesInBoundaries,
	doPositionsInBoundariesExistInLevel
} from './../module/Level.js';

import Knight from './../gameObjects/actors/Knight.js';
import KingSlime from './../gameObjects/actors/KingSlime.js';
import Slime from './../gameObjects/actors/Slime.js';
import RustyDagger from './../gameObjects/items/equipment/RustyDagger.js';
import Wall from './../gameObjects/structures/Wall.js';
import Grave from './../gameObjects/structures/Grave.js';
import Tree from './../gameObjects/structures/Tree.js';


export default function createRandomLevel(state, room, player) {
	// Create a tileset
	let tiles = createTileSet({
		width: LEVEL_WIDTH,
		height: LEVEL_HEIGHT,
	});

	state = tiles.reduce((newState, tile) => {
		return addTile(tile)(newState);
	}, state);

	// Create a level
	let level = createLevel({
		size: {
			width: LEVEL_WIDTH,
			height: LEVEL_HEIGHT,
		},
		roomId: room.id,
		tiles: tiles.map((tile) => {
			return tile.id;
		}),
	});

	state = addLevel(level)(state);

	state = moveGameObjectToPositionInLevel(state, player, {
		x: Math.floor(LEVEL_WIDTH / 2),
		y: Math.floor(LEVEL_WIDTH / 2),
	}, level.id);

	state = fillWithRandomStuff(state, level);

	return state;
}

function fillWithRandomStuff(state, level) {
	return getTilesInLevel(state, level.id).reduce((newState, tile) => {
		if (!doesLevelHaveSolidEntitiesInBoundaries(newState, level.id, tile.positionInLevel, { width: 1, height: 1 })) {
			if (onChance(500)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, RustyDagger);
			}

			if (onChance(40)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Slime, {
					nonPlayer: true,
				});
			}

			if (onChance(240)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Knight, {
					nonPlayer: true,
				});
			}

			if (onChance(40)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Tree);
			}

			if (onChance(200)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Grave);
			}

			if (onChance(10)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, Wall);
			}
		}

		if (
			!doesLevelHaveSolidEntitiesInBoundaries(newState, level.id, tile.positionInLevel, { width: 2, height: 2 })
			&& doPositionsInBoundariesExistInLevel(newState, level.id, tile.positionInLevel, { width: 2, height: 2 })
		) {
			if (onChance(240)) {
				return createGameObjectAtPositionInLevel(newState, level.id, tile.positionInLevel, KingSlime, {
					nonPlayer: true,
				});
			}
		}

		return newState;
	}, state);
}
