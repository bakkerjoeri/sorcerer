import PureStructure from './../PureStructure.js';
import SpriteComponent from './../../library/core/component/SpriteComponent.js';

export const GRAVE_COMPONENTS_BLUEPRINT = {
	sprite: new SpriteComponent({
		assetId: 'grave',
	}),
};

export default function Grave(components = {}) {
	return new PureStructure({
		...GRAVE_COMPONENTS_BLUEPRINT,
		...components,
	});
}
