import PureEntity from './PureEntity.js';

export const STRUCTURE_COMPONENTS_BLUEPRINT = {};

export default function Structure(components = {}) {
	return new PureEntity({
		...STRUCTURE_COMPONENTS_BLUEPRINT,
		...components,
	});
}
