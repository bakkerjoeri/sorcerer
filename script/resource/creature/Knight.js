import Structure from 'entity/Structure';
import {Grave} from 'resource/structure/Grave';

export const Knight = {
	type: 'knight',
	stats: {
		maxHealth: 10,
		strength: 3,
	},
	spriteName: 'knight',
	size: {
		width: 1,
		height: 1,
	},
	solid: true,
	deathrattle: function (map) {
		map.addStructure(new Structure(Grave), this.positionInLevel);
	},
};
