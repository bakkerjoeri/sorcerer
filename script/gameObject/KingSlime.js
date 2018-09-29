import Actor from './Actor';
import HealthComponent from './../component/HealthComponent';
import SpriteComponent from './../library/core/component/SpriteComponent';

export const KING_SLIME_COMPONENTS_BLUEPRINT = {
	name: 'King Slime',
	health: new HealthComponent({
		maximum: 16,
	}),
	sprite: new SpriteComponent({
		assetId: 'giantslime',
		framesPerSecond: 1,
	}),
	sizeInLevel: {
		width: 2,
		height: 2,
	},
	deathrattle: 'spawnSlimes',
};

export default function KingSlime(components = {}) {
	return new Actor({
		...KING_SLIME_COMPONENTS_BLUEPRINT,
		...components,
	});
}
