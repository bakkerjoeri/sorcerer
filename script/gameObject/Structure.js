import Entity from './Entity';
import HealthComponent from './../component/HealthComponent';

export const ACTOR_COMPONENTS_BLUEPRINT = {};

export default function Structure(components = {}) {
	return new Entity({
		...ACTOR_COMPONENTS_BLUEPRINT,
		...components,
	});
}
