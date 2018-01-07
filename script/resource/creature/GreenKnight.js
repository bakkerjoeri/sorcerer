import AssetManager from 'core/AssetManager';
import Structure from 'entity/Structure';
import {Grave} from 'resource/structure/Grave';

export const GreenKnight = {
	type: 'green knight',
	stats: {
		maxHealth: 10,
		strength: 3,
	},
	sprite: AssetManager.getAsset('greenKnightIdle', 'SPRITE'),
	size: {
		width: 1,
		height: 1,
	},
	solid: true,
	deathrattle: function (map) {
		map.addStructure(new Structure(Grave), this.mapPosition);
	},
};
