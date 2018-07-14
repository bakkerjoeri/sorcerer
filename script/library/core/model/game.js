import gameStateStore from './gameStateStore';
import createAction from './../../store/createAction';
import createSelector from './../../store/createSelector';

export const setGameName = name => createAction(gameStateStore, state => ({
	...state,
	game: {
		...state.game,
		name: name,
	},
}));

export const setCurrentRoomId = roomId => createAction(gameStateStore, state => ({
	...state,
	game: {
		...state.game,
		currentRoomId: roomId,
	},
}));

export const getCurrentRoomId = () => createSelector(gameStateStore, state => {
	return state.game.currentRoomId;
});
