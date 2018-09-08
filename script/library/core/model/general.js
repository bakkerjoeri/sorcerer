import gameStateStore from './gameStateStore';

export const replaceState = newState => gameStateStore.dispatch(state => ({...newState}));

export const appendState = appendedState => gameStateStore.dispatch(state => ({
	...state,
	...appendedState,
}));
