export const setGameName = name => state => ({
	...state,
	game: {
		...state.game,
		name: name,
	},
});

export const setCurrentRoomId = roomId => state => ({
	...state,
	game: {
		...state.game,
		currentRoomId: roomId,
	},
});

export const getGame = (state) => {
	return state.game;
}

export const getCurrentRoomId = (state) => {
	return getGame(state).currentRoomId;
};
