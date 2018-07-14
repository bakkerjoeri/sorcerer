import gameStateStore from './gameStateStore';
import createAction from './../../store/createAction';
import createSelector from './../../store/createSelector';

export const addSpriteFrame = spriteFrame => createAction(gameStateStore, state => ({
	...state,
	spriteFrames: {
		...state.spriteFrames,
		[spriteFrame.id]: spriteFrame,
	},
}));

export const getSpriteFrameWithId = (spriteFrameId) => createSelector(gameStateStore, state => {
	return state.spriteFrames[spriteFrameId];
});
