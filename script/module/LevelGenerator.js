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
            
            fillLevel(level);
            
            return level;
        }    
    }
}

function fillLevel(level) {
	level.forEachTile((tile) => {
        // if (
		// 	!level.hasSolidEntitiesInBoundaries(tile.position, KingSlime.size)
		// 	&& level.areBoundariesWithinLevelBoundaries(tile.position, KingSlime.size)
		// ) {
		// 	if (onChance(240)) {
		// 		level.addActor(new NonPlayer(KingSlime), tile.position);
        // 
		// 		return;
		// 	}
		// }
        
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
			
			if (onChance(2)) {
				level.addStructure(new Structure(Wall), tile.position);
			
				return;
			}
		}
	});
}

function onChance(denominator) {
	return Math.floor(Math.random() * denominator + 1) === 1;
}
