import Actor from './../Actor.js';
import HealthComponent from './../../component/HealthComponent.js';
import SpriteComponent from './../../library/core/component/SpriteComponent.js';

export const KNIGHT_COMPONENTS_BLUEPRINT = {
	name: 'Knight',
	health: new HealthComponent({
		maximum: 15,
	}),
	sprite: new SpriteComponent({
		assetId: 'knight',
		framesPerSecond: 4,
	}),
	inventory: [],
};

export default function Knight(components = {}) {
	return new Actor({
		...KNIGHT_COMPONENTS_BLUEPRINT,
		...components,
	});
}
