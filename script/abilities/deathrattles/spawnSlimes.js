import Slime from './../../gameObjects/actors/Slime.js';
import {getPositionsInRangeInLevel, createGameObjectAtPositionInLevelPure} from './../../module/Level.js';

export default function spawnSlimes(state, levelId, entity) {
	let {positionInLevel, sizeInLevel} = entity.components;

	return getPositionsInRangeInLevel(state, levelId, positionInLevel, sizeInLevel).reduce((newState, position) => {
		return createGameObjectAtPositionInLevelPure(newState, levelId, position, Slime, {nonPlayer: true});
	}, state);
}
