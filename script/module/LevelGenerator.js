import Level from 'module/Level';

import NonPlayer from 'object/NonPlayer';
import Structure from 'object/Structure';

import {Knight} from 'resource/creature/Knight';
import {Slime} from 'resource/creature/Slime';
import {KingSlime} from 'resource/creature/KingSlime';
import {Tree} from 'resource/structure/Tree';
import {Wall} from 'resource/structure/Wall';
import {Grave} from 'resource/structure/Grave';

const LEVEL_KEY_RANDOM = 'random';
const LEVEL_KEY_LOCKED_UP_KNIGHT = 'locked_up_knight';
const LEVEL_KEY_ONLY_CREATURES = 'only_creatures';

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
    }
}

function createCage(level, position) {
    level.forEachTile((tile) => {
        if (!tile.hasSolidEntities()) {
            if (tile.position.y !== position.y) {
                level.addStructure(new Structure(Wall), tile.position);
                
                return;
            }
        }
    });
}

function fillWithRandomStuff(level) {
	level.forEachTile((tile) => {
		if (!tile.hasSolidEntities()) {
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

function fillWithRandomCreatures(level) {
    level.forEachTile((tile) => {
        if (
			!level.hasSolidEntitiesInBoundaries(tile.position, KingSlime.size)
			&& level.areBoundariesWithinLevelBoundaries(tile.position, KingSlime.size)
		) {
			if (onChance(240)) {
				level.addActor(new NonPlayer(KingSlime), tile.position);
        
				return;
			}
		}
        
		if (!tile.hasSolidEntities()) {
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
