import gameStateStore from './gameStateStore';
import createAction from './../../store/createAction';
import createSelector from './../../store/createSelector';

export const replaceState = newState => createAction(gameStateStore, state => ({...newState}));

export const appendState = appendedState => createAction(gameStateStore, state => ({
	...state,
	...appendedState,
}));

export const getState = () => createSelector(gameStateStore, state => {
	return state;
});
