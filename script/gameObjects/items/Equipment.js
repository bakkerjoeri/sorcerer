import Item from './../Item.js';

export const EQUIPMENT_COMPONENTS_BLUEPRINT = {
	canEquip: true,
};

export default function Equipment(components = {}) {
	return new Item({
		...EQUIPMENT_COMPONENTS_BLUEPRINT,
		...components,
	});
}
