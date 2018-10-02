import Level from 'module/Level.js';

import NonPlayer from 'object/NonPlayer.js';
import Structure from 'object/Structure.js';

import {Knight} from 'resource/creature/Knight.js';
import {Slime} from 'resource/creature/Slime.js';
import {KingSlime} from 'resource/creature/KingSlime.js';
import {GiantSlime} from 'resource/creature/GiantSlime.js';
import {Tree} from 'resource/structure/Tree.js';
import {Wall} from 'resource/structure/Wall.js';
import {Grave} from 'resource/structure/Grave.js';

const LEVEL_KEY_RANDOM = 'random';
const LEVEL_KEY_LOCKED_UP_KNIGHT = 'locked_up_knight';
const LEVEL_KEY_ONLY_CREATURES = 'only_creatures';
const LEVEL_KEY_KING_SLIME_DIJKSTRA_TEST = 'king_slime_dijkstra_test';

export default class LevelGenerator {
	static createLevel(room, player, key) {
		if (key === LEVEL_KEY_RANDOM) {
			let level = new Level({
				width: 36,
				height: 24,
			}, room);

			level.addActor(player, {
				x: 36 / 2,
				y: 24 / 2,
			});

			fillWithRandomStuff(level);

			return level;
		}

		if (key === LEVEL_KEY_LOCKED_UP_KNIGHT) {
			let level = new Level({
				width: 10,
				height: 10,
			}, room);

			level.addActor(player, {
				x: 4,
				y: 3,
			});

			level.addActor(new NonPlayer(Knight), {
				x: 3,
				y: 3,
			});

			createCage(level, {
				x: 3,
				y: 3,
			});

			return level;
		}

		if (key === LEVEL_KEY_ONLY_CREATURES) {
			let level = new Level({
				width: 36,
				height: 24,
			}, room);
							level.addActor(player, {
				x: 36 / 2,
				y: 24 / 2,
			});

			fillWithRandomCreatures(level);
			return level;
		}

		if (key === LEVEL_KEY_KING_SLIME_DIJKSTRA_TEST) {
			let level = new Level({
				width: 8,
				height: 8,
			}, room);

			level.addActor(player, {
				x: 4,
				y: 1,
			});

			level.addActor(new NonPlayer(KingSlime), {
				x: 0,
				y: 4,
			});

			level.addActor(new NonPlayer(GiantSlime), {
				x: 4,
				y: 6,
			});

			level.addActor(new Structure(Tree), {
				x: 7,
				y: 7,
			});

			level.addActor(new Structure(Tree), {
				x: 2,
				y: 5,
			});

			level.addActor(new Structure(Wall), {
				x: 0,
				y: 3,
			});

			level.addActor(new Structure(Wall), {
				x: 6,
				y: 5,
			});

			return level;
		}
	}
}

function createCage(level, position) {
	level.forEachTile((tile) => {
		if (!tile.hasSolidGameObjects()) {
			if (tile.position.y !== position.y) {
				level.addStructure(new Structure(Wall), tile.position);
									return;
			}
		}
	});
}

function fillWithRandomStuff(level) {
	level.forEachTile((tile) => {
		if (!tile.hasSolidGameObjects()) {
			if (onChance(40)) {
				level.addActor(new NonPlayer(Slime), tile.position);

				return;
			}

			if (onChance(240)) {
				level.addActor(new NonPlayer(Knight), tile.position);

				return;
			}

			if (onChance(40)) {
				level.addStructure(new Structure(Tree), tile.position);

				return;
			}

			if (onChance(200)) {
				level.addStructure(new Structure(Grave), tile.position);

				return;
			}

			if (onChance(10)) {
				level.addStructure(new Structure(Wall), tile.position);

				return;
			}
		}
					if (
			!level.hasSolidGameObjectsInBoundaries(tile.position, GiantSlime.size)
			&& level.areBoundariesWithinLevelBoundaries(tile.position, GiantSlime.size)
		) {
			if (onChance(240)) {
				level.addActor(new NonPlayer(GiantSlime), tile.position);
							return;
			}
		}
	});
}

function fillWithRandomCreatures(level) {
	level.forEachTile((tile) => {
		if (
			!level.hasSolidGameObjectsInBoundaries(tile.position, GiantSlime.size)
			&& level.areBoundariesWithinLevelBoundaries(tile.position, GiantSlime.size)
		) {
			if (onChance(240)) {
				level.addActor(new NonPlayer(GiantSlime), tile.position);
							return;
			}
		}

		if (!tile.hasSolidGameObjects()) {
			if (onChance(40)) {
				level.addActor(new NonPlayer(Slime), tile.position);

				return;
			}

			if (onChance(240)) {
				level.addActor(new NonPlayer(Knight), tile.position);

				return;
			}
		}
	});
}

function onChance(denominator) {
	return Math.floor(Math.random() * denominator + 1) === 1;
}
