import { createPureGameObject } from './../library/core/module/GameObject.js';

export const ENTITY_COMPONENTS_BLUEPRINT = {
	isSolid: true,
	isVisible: true,
	currentLevelId: null,
	position: {
		x: 0,
		y: 0,
	},
	positionInLevel: {
		x: 0,
		y: 0,
	},
	sizeInLevel: {
		width: 1,
		height: 1,
	},
};

export default function Entity(components = {}) {
	return createPureGameObject({
		...ENTITY_COMPONENTS_BLUEPRINT,
		...components,
	});
}
