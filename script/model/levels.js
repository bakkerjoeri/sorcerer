import gameStateStore from './../library/core/model/gameStateStore';
import {getTileWithId} from './tiles';

export const addLevel = level => gameStateStore.dispatch(state => ({
	...state,
	levels: {
		...state.levels,
		[level.id]: level,
	},
}));

export const getLevelWithId = levelId => {
	return gameStateStore.getState().levels[levelId];
}

export const getTilesInLevel = levelId => {
	return getLevelWithId(levelId).tiles.map(getTileWithId);
}
