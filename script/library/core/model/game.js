import gameStateStore from './gameStateStore';

export const setGameName = name => gameStateStore.dispatch(state => ({
	...state,
	game: {
		...state.game,
		name: name,
	},
}));

export const setCurrentRoomId = roomId => gameStateStore.dispatch(state => ({
	...state,
	game: {
		...state.game,
		currentRoomId: roomId,
	},
}));

export const getCurrentRoomId = () => {
	return gameStateStore.getState().game.currentRoomId;
};
