import PureGrave from './../../gameObjects/structures/PureGrave.js';
import {createGameObjectAtPositionInLevelPure} from './../../module/Level.js';

export default function createGrave(state, levelId, entity) {
	let {positionInLevel} = entity.components;

	return createGameObjectAtPositionInLevelPure(state, levelId, positionInLevel, PureGrave);
}
