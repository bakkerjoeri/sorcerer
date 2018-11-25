import Equipment from './../Equipment.js';
import SpriteComponent from './../../../library/core/component/SpriteComponent.js';

export const RUSTY_DAGGER_COMPONENTS_BLUEPRINT = {
	name: 'Rusty dagger',
	attack: 3,
	sprite: new SpriteComponent({
		assetId: 'rustydagger',
	}),
};

export default function RustyDagger(components = {}) {
	return new Equipment({
		...RUSTY_DAGGER_COMPONENTS_BLUEPRINT,
		...components,
	});
}
