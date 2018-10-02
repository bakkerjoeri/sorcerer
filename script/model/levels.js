import {getTileWithId} from './tiles.js';

export const addLevel = level => state => ({
	...state,
	levels: {
		...state.levels,
		[level.id]: level,
	},
});

export const getLevels = state => {
	return state.levels;
}

export const getLevelWithId = (state, levelId) => {
	return getLevels(state)[levelId];
}

export const getTilesInLevel = (state, levelId) => {
	return getLevelWithId(state, levelId).tiles.map((tileId) => {
		return getTileWithId(state, tileId);
	});
}
