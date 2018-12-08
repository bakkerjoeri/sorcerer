import Structure from './../Structure.js';
import SpriteComponent from './../../library/core/component/SpriteComponent.js';

export const GRAVE_COMPONENTS_BLUEPRINT = {
	sprite: new SpriteComponent({
		assetId: 'grave',
	}),
};

export default function Grave(components = {}) {
	return new Structure({
		...GRAVE_COMPONENTS_BLUEPRINT,
		...components,
	});
}
