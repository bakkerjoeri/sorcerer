import Entity from './Entity.js';
import HealthComponent from './../component/HealthComponent.js';

export const STRUCTURE_COMPONENTS_BLUEPRINT = {};

export default function Structure(components = {}) {
	return new Entity({
		...STRUCTURE_COMPONENTS_BLUEPRINT,
		...components,
	});
}
