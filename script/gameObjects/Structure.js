import Entity from './Entity.js';

export const STRUCTURE_COMPONENTS_BLUEPRINT = {};

export default function Structure(components = {}) {
	return new Entity({
		...STRUCTURE_COMPONENTS_BLUEPRINT,
		...components,
	});
}
