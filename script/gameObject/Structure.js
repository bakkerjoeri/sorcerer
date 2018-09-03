import Entity from './Entity';
import HealthComponent from './../component/HealthComponent';

export const STRUCTURE_BLUEPRINTS = {};

export default function Structure(components = {}) {
	return new Entity({
		...STRUCTURE_BLUEPRINTS,
		...components,
	});
}
