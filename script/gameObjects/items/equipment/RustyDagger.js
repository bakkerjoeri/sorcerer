import Equipment from './../Equipment.js';

export const RUSTY_DAGGER_COMPONENTS_BLUEPRINT = {
	name: 'Rusty dagger',
	attack: 3,
};

export default function RustyDagger(components = {}) {
	return new Equipment({
		...RUSTY_DAGGER_COMPONENTS_BLUEPRINT,
		...components,
	});
}
