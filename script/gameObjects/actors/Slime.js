import Actor from './../Actor.js';
import HealthComponent from './../../component/HealthComponent.js';
import SpriteComponent from './../../library/core/component/SpriteComponent.js';

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
