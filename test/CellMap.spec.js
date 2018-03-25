import chai from 'chai';
import CellMap from './../script/module/CellMap';

let assert = chai.assert;

describe('CellMap', () => {
	describe('static createWithSize', () => {
		it('returns a CellMap with proper array structure', () => {
			let cellMap = CellMap.createWithSize({
				width: 3,
				height: 3,
			});

			assert.lengthOf(cellMap, 3, 'cellMap has 3 rows');
			assert.lengthOf(cellMap[0], 3, 'cellMap has 3 columns');
		});
	});
});
