import Structure from './Structure.js';
import SpriteComponent from './../library/core/component/SpriteComponent.js';

export const WALL_COMPONENTS_BLUEPRINT = {
	sprite: new SpriteComponent({
		assetId: 'wall',
	}),
};

export default function Wall(components = {}) {
	return new Structure({
		...WALL_COMPONENTS_BLUEPRINT,
		...components,
	});
}
