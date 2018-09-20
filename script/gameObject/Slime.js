import Actor from './Actor';
import HealthComponent from './../component/HealthComponent';
import SpriteComponent from './../library/core/component/SpriteComponent';

export const SLIME_COMPONENTS_BLUEPRINT = {
	name: 'Slime',
	health: new HealthComponent({
		maximum: 4,
	}),
	sprite: new SpriteComponent({
		assetId: 'slime',
		framesPerSecond: 2,
	}),
};

export default function Slime(components = {}) {
	return new Actor({
		...SLIME_COMPONENTS_BLUEPRINT,
		...components,
	});
}
