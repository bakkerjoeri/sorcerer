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
