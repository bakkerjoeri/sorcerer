import Structure from 'object/Structure';
import {Grave} from 'resource/structure/Grave';

export const GreenKnight = {
	type: 'green knight',
	stats: {
		maxHealth: 10,
		strength: 3,
		moveCost: 100,
		attackCost: 100,
	},
	spriteName: 'greenknight',
	size: {
		width: 1,
		height: 1,
	},
	solid: true,
	deathrattle: function (level) {
		level.addStructure(new Structure(Grave), this.positionInLevel);
	},
};
