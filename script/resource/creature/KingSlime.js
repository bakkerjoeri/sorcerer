import NonPlayer from 'entity/NonPlayer';
import {Slime} from 'resource/creature/Slime';

export const KingSlime = {
	type: 'king slime',
	stats: {
		maxHealth: 28,
		strength: 2,
	},
	spriteName: 'kingslime',
	size: {
		width: 2,
		height: 2,
	},
	solid: true,
	deathrattle: function(map) {
		map.addActor(new NonPlayer(Slime), this.mapPosition);
		map.addActor(new NonPlayer(Slime), {x: this.mapPosition.x + 1, y: this.mapPosition.y});
		map.addActor(new NonPlayer(Slime), {x: this.mapPosition.x, y: this.mapPosition.y + 1});
		map.addActor(new NonPlayer(Slime), {x: this.mapPosition.x + 1, y: this.mapPosition.y + 1});
	},
};
