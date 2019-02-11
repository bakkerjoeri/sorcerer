import Structure from './../Structure.js';
import SpriteComponent from './../../library/core/component/SpriteComponent.js';

export const TREE_COMPONENTS_BLUEPRINT = {
	sprite: new SpriteComponent({
		assetId: 'tree',
	}),
};

export default function Grave(components = {}) {
	return new Structure({
		...TREE_COMPONENTS_BLUEPRINT,
		...components,
	});
}
