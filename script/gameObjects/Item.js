import Entity from './Entity.js';

export const ITEM_COMPONENTS_BLUEPRINT = {
	isItem: true,
	isSolid: false,
};

export default function Item(components = {}) {
	return new Entity({
		...ITEM_COMPONENTS_BLUEPRINT,
		...components,
	});
}
