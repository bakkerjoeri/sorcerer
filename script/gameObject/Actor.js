import Entity from './Entity';
import HealthComponent from './../component/HealthComponent';

export const ACTOR_COMPONENTS_BLUEPRINT = {
	actor: true,
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
