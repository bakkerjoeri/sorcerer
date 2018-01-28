import NonPlayer from 'entity/NonPlayer';
import {Slime} from 'resource/creature/Slime';

export const KingSlime = {
	type: 'king slime',
	stats: {
		maxHealth: 28,
		strength: 2,
		moveCost: 400,
		attackCost: 400,
	},
	spriteName: 'kingslime',
	size: {
		width: 2,
		height: 2,
	},
	solid: true,
	deathrattle: function(map) {
		map.addActor(new NonPlayer(Slime), this.positionInLevel);
		map.addActor(new NonPlayer(Slime), {x: this.positionInLevel.x + 1, y: this.positionInLevel.y});
		map.addActor(new NonPlayer(Slime), {x: this.positionInLevel.x, y: this.positionInLevel.y + 1});
		map.addActor(new NonPlayer(Slime), {x: this.positionInLevel.x + 1, y: this.positionInLevel.y + 1});
	},
};
