import Entity from './Entity.js';
import HealthComponent from './../component/HealthComponent.js';

export const ACTOR_COMPONENTS_BLUEPRINT = {
	actor: true,
	baseAttack: 1,
	health: new HealthComponent({
		maximum: 1,
	}),
	actionTicker: {
		ticks: 0,
	},
	deathrattle: 'createGrave',
};

export default function Actor(components = {}) {
	return new Entity({
		...ACTOR_COMPONENTS_BLUEPRINT,
		...components,
	});
}
