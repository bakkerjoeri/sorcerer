export const replaceState = newState => state => ({...newState});

export const appendState = appendedState => state => ({
	...state,
	...appendedState,
});
