import {createGameObject} from './../library/core/module/GameObject';

export const TILE_ENTITY_COMPONENTS_BLUEPRINT = {
	positionInLevel: {
		x: 0,
		y: 0,
	},
	gameObjects: [],
};

export default function TileGameObject(components) {
	return createGameObject({
		...TILE_ENTITY_COMPONENTS_BLUEPRINT,
		...components,
	})
};
