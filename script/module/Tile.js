import createStateEntity from './../library/core/utility/createStateEntity';
import {addTile} from './../model/tiles';

export function createTile(properties = {}) {
	const DEFAULT_PROPERTIES = {
		entities: [],
		positionInLevel: {
			x: 0,
			y: 0,
		},
	};

	let tile = createStateEntity('tile', {
		...properties,
		...DEFAULT_PROPERTIES,
	});

	addTile(tile);

	return tile;
}

export function createTileSet(size) {
	let tiles = [];

	for (let y = 0; y < size.height; y = y + 1) {
		for (let x = 0; x < size.width; x = x + 1) {
			tiles.push(createTile({
				positionInLevel: {
					x: x,
					y: y,
				},
			}));
		}
	}

	return tiles;
}
